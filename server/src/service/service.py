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

    def paginated_list(self, service_filter: ServiceFilter) -> Page[ServiceRead]:
        query = select(Service)
        query = service_filter.filter(query)
        query = service_filter.sort(query)

        return paginate(self.session, query)

    def user_requested_services_paginated_list(self, current_user: User) -> Page[ServiceRead]:
        requested_services = self.service_request_service.get_users_service_requests(current_user)
        requested_service_ids = [req_service.service.id for req_service in requested_services]

        query = select(Service).filter(Service.id.in_(requested_service_ids))

        return paginate(self.session, query)

    def retrieve(self, service_id: str) -> Service | None:
        return self.session.query(Service).filter(Service.id == service_id).first()

    def create(self, service: ServiceCreate, current_user: User):
        organization = self.organization_service.get_organization_by_user_id(current_user.id)

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
        db_service = self.session.query(Service).filter(Service.id == service_id).first()
        if db_service:
            self.session.delete(db_service)
            self.session.commit()
        return db_service
