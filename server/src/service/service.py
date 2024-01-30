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

    def get_services(self, service_filter: ServiceFilter) -> Page[ServiceRead]:
        query = select(Service)
        query = service_filter.filter(query)
        query = service_filter.sort(query)

        return paginate(self.session, query)

    def get_services_for_user_requests(
        self, current_user: User
    ) -> Page[ServiceRead]:
        requested_services = (
            self.service_request_service.get_services_for_user(current_user)
        )
        requested_service_ids = [
            req_service.service.id for req_service in requested_services
        ]

        query = select(Service).filter(Service.id.in_(requested_service_ids))

        return paginate(self.session, query)

    def get_service(self, service_id: str):
        return (
            self.session.query(Service)
            .filter(Service.id == service_id)
            .first()
        )

    def create_service(self, service: ServiceCreate, current_user: User):
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

    def update_service(self, service_id: str, updated_service: ServiceUpdate):
        db_service = (
            self.session.query(Service)
            .filter(Service.id == service_id)
            .first()
        )
        if db_service:
            for key, value in updated_service.dict().items():
                setattr(db_service, key, value)
            self.session.commit()
            self.session.refresh(db_service)
        return db_service

    def delete_service(self, service_id: str):
        db_service = (
            self.session.query(Service)
            .filter(Service.id == service_id)
            .first()
        )
        if db_service:
            self.session.delete(db_service)
            self.session.commit()
        return db_service


# TODO uncomment when organization entity relation is added
# def get_services_by_organization_id(db: Session, organization_id: str):
#     return db.query(Service).filter(Service.organization_id == organization_id)
