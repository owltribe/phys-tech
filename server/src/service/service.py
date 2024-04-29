import uuid
from typing import Optional, Type

from fastapi import File, HTTPException, UploadFile, status
from fastapi_pagination.ext.sqlalchemy import paginate
from fastapi_pagination.links import Page
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from models import Service, ServiceImage, User
from src.organization.service import OrganizationService
from src.s3.service import S3Service
from src.service.schemas import (
    ServiceCreate,
    ServiceFilter,
    ServiceRead,
    ServiceUpdate,
)
from src.service_image.service import ServiceImageService
from src.service_request.service import ServiceRequestService


class ServiceService:
    def __init__(self, session: Session) -> None:
        self.session = session
        self.organization_service = OrganizationService(session)
        self.service_request_service = ServiceRequestService(session)
        self.service_image_service = ServiceImageService(session)
        self.s3_service = S3Service()

    def paginated_list(
        self, service_filter: ServiceFilter, optional_current_user: Optional[User] = None
    ) -> Page[ServiceRead]:
        query = select(Service)
        query = service_filter.filter(query)
        query = service_filter.sort(query)

        # Fetch the paginated list of services
        pagination = paginate(self.session, query)

        # If a current user is provided, prepare a set of their service IDs for quick lookups
        if optional_current_user:
            user_service_ids = set(s.id for s in self.list_by_user_id(optional_current_user.id))
            for service in pagination.items:
                service.is_editable = service.id in user_service_ids

        return pagination

    def list_by_user_id(self, user_id: str) -> list[Type[Service]]:
        organization = self.organization_service.retrieve_by_user_id(user_id)

        if organization:
            return (
                self.session.query(Service)
                .filter(Service.organization_id == organization.id)
                .all()
            )
        return []

    def retrieve(
        self, service_id: str, current_user: Optional[User] = None
    ) -> Type[Service]:
        instance = (
            self.session.query(Service)
            .filter(Service.id == service_id)
            .options(joinedload(Service.service_images))
            .first()
        )

        if current_user and instance in self.list_by_user_id(current_user.id):
            instance.is_editable = True

        if instance is None:
            raise HTTPException(status_code=404, detail="Услуга не найдена")

        return instance

    def create(self, service: ServiceCreate, current_user: User):
        organization = self.organization_service.retrieve_by_user_id(
            current_user.id
        )

        if organization is None:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="К данному пользователю не найдена организация",
            )

        db_service = Service(
            organization=organization,
            name=service.name,
            description=service.description,
            expected_result=service.expected_result,
            cost=service.cost,
        )
        self.session.add(db_service)
        self.session.commit()
        self.session.refresh(db_service)
        return db_service

    def update(self, service_id: str, updated_service: ServiceUpdate):
        instance = self.retrieve(service_id)

        if instance:
            for key, value in updated_service.dict().items():
                setattr(instance, key, value)
            self.session.commit()
            self.session.refresh(instance)
        return instance

    def destroy(self, service_id: str):
        instance = self.retrieve(service_id)

        service_images = self.service_image_service.list_by_service_id(
            service_id
        )

        if service_images:

            for image in service_images:
                self.s3_service.delete_service_image(instance.id, image.id)
                self.session.delete(image)
            self.session.commit()

        if instance:
            self.s3_service.delete_service_folder(instance.id)
            self.session.delete(instance)
            self.session.commit()
        return None

    def upload_service_image(
        self, service_id: str, image: UploadFile = File(...)
    ):
        instance = self.retrieve(service_id)

        if instance:
            service_image_id = str(uuid.uuid4())

            service_image_url = self.s3_service.upload_service_image(
                service_id=instance.id,
                service_image_id=service_image_id,
                file=image,
            )
            service_image = ServiceImage(
                id=service_image_id,
                url=service_image_url,
                service_id=instance.id,
            )
            self.session.add(service_image)
            self.session.commit()
            self.session.refresh(instance)

        return instance

    def list_service_images(self, service_id: str):
        return self.service_image_service.list_by_service_id(service_id)
