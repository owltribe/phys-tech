from typing import Type

from fastapi import HTTPException, status
from fastapi_pagination.ext.sqlalchemy import paginate
from fastapi_pagination.links import Page
from sqlalchemy import select
from sqlalchemy.orm import Session

from models import Service, ServiceRequest, ServiceRequestStatus, User
from src.service_request.schemas import (
    ServiceRequestCreate,
    ServiceRequestFilter,
    ServiceRequestRead,
    ServiceRequestUpdate,
)


class ServiceRequestService:
    def __init__(self, session: Session) -> None:
        self.session = session

    def paginated_list(
        self, service_request_filter: ServiceRequestFilter
    ) -> Page[ServiceRequestRead]:
        query = select(ServiceRequest).outerjoin(Service)
        query = service_request_filter.filter(query)
        query = service_request_filter.sort(query)

        return paginate(self.session, query)

    def retrieve(self, service_request_id: str) -> Type[ServiceRequest]:
        instance = (
            self.session.query(ServiceRequest)
            .filter(ServiceRequest.id == service_request_id)
            .first()
        )

        if instance is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Запрос на услугу не найден.",
            )
        return instance

    def create(
        self, service_request_create: ServiceRequestCreate, requested_by: User
    ) -> ServiceRequest:
        instance = ServiceRequest(
            status=ServiceRequestStatus.PENDING,
            service_id=service_request_create.service_id,
            requested_by_id=requested_by.id,
            comment=service_request_create.comment,
        )
        self.session.add(instance)
        self.session.commit()
        self.session.refresh(instance)
        return instance

    def update(
        self,
        service_request_id: str,
        service_request_update: ServiceRequestUpdate,
    ) -> Type[ServiceRequest]:
        instance = self.retrieve(service_request_id)

        if instance:
            for key, value in service_request_update.dict().items():
                setattr(instance, key, value)
            self.session.commit()
            self.session.refresh(instance)

        return instance

    def delete(self, service_request_id: str) -> Type[ServiceRequest]:
        instance = self.retrieve(service_request_id)

        if instance:
            self.session.delete(instance)
            self.session.commit()

        return instance
