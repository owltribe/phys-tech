from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_filter import FilterDepends
from fastapi_pagination.links import Page

from database import DbSession
from models import User
from src.auth.auth_backend import current_active_user
from src.service_request.schemas import (
    ServiceRequestCreate,
    ServiceRequestFilter,
    ServiceRequestRead,
    ServiceRequestUpdate,
)
from src.service_request.service import ServiceRequestService

service_request_router = APIRouter(
    prefix="/service-requests", tags=["Service Requests"]
)

service = ServiceRequestService(session=DbSession)


@service_request_router.get("", response_model=Page[ServiceRequestRead])
def paginated_list(
    service_request_filter: ServiceRequestFilter = FilterDepends(
        ServiceRequestFilter
    ),
):
    return service.list(service_request_filter)


@service_request_router.post("", response_model=ServiceRequestRead)
def create(
    service_request_create: ServiceRequestCreate,
    user: User = Depends(current_active_user),
):
    return service.create(
        service_request_create=service_request_create, requested_by=user
    )


@service_request_router.get(
    "/{service_request_id}", response_model=ServiceRequestRead
)
def retrieve(service_request_id: str):
    instance = service.retrieve(service_request_id=service_request_id)

    if instance is None:
        raise HTTPException(
            status_code=404, detail="Запрос на услугу не найден"
        )
    return instance


@service_request_router.put(
    "/{service_request_id}", response_model=ServiceRequestRead
)
def update(
    service_request_id: str,
    service_request_update: ServiceRequestUpdate,
):
    instance = service.retrieve(service_request_id)

    if instance is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Запрос на услугу не найден",
        )

    updated_instance = service.update(
        service_request_id, service_request_update
    )

    if updated_instance is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ошибка обновления запроса услуги",
        )

    return updated_instance


@service_request_router.delete(
    "/{service_request_id}",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete(service_request_id: str):
    deleted_instance = service.delete(service_request_id)

    if deleted_instance is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Запрос на услугу не найден",
        )

    return None
