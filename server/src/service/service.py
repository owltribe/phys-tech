from typing import Type

from fastapi import HTTPException, status
from fastapi_pagination.ext.sqlalchemy import paginate
from fastapi_pagination.links import Page
from sqlalchemy import select
from sqlalchemy.orm import Session

from models import Service, User
from src.organization.service import OrganizationService
from src.service.schemas import (
    ServiceCreate,
    ServiceFilter,
    ServiceRead,
    ServiceUpdate,
)
from src.service_request.service import ServiceRequestService


class ServiceService:
    def __init__(self, session: Session) -> None:
        self.session = session
        self.organization_service = OrganizationService(session)
        self.service_request_service = ServiceRequestService(session)

    def paginated_list(
        self, service_filter: ServiceFilter
    ) -> Page[ServiceRead]:
        query = select(Service)
        query = service_filter.filter(query)
        query = service_filter.sort(query)

        return paginate(self.session, query)

    def retrieve(self, service_id: str) -> Type[Service]:
        instance = (
            self.session.query(Service)
            .filter(Service.id == service_id)
            .first()
        )

        if instance is None:
            raise HTTPException(status_code=404, detail="Услуга не найдена")

        return instance

    def create(self, service: ServiceCreate, current_user: User):
        organization = self.organization_service.get_organization_by_user_id(
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

        if instance:
            self.session.delete(instance)
            self.session.commit()
        return None
