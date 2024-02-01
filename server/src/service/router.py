from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_filter import FilterDepends
from fastapi_pagination.links import Page

from database import DbSession
from models import User, UserRole
from src.auth.auth_backend import current_active_user
from src.auth.permission_checker import PermissionChecker
from src.service.schemas import (
    ServiceCreate,
    ServiceFilter,
    ServiceRead,
    ServiceUpdate,
)
from src.service.service import ServiceService

services_router = APIRouter(prefix="/services", tags=["Services"])

service = ServiceService(session=DbSession)


@services_router.get("", response_model=Page[ServiceRead])
async def paginated_list(
    service_filter: ServiceFilter = FilterDepends(ServiceFilter),
):
    return service.paginated_list(service_filter)


@services_router.get("/for-user-requests", response_model=Page[ServiceRead])
async def user_requested_services_paginated_list(
    current_user: User = Depends(PermissionChecker(required_roles=[UserRole.CLIENT])),
):
    return service.user_requested_services_paginated_list(current_user)


@services_router.post("", response_model=ServiceRead)
async def create_service(
    service_create: ServiceCreate,
    current_user: User = Depends(current_active_user),
):
    if current_user.role is not UserRole.ORGANIZATION:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Создание услуг достпуно только для организаций.",
        )

    return service.create(service=service_create, current_user=current_user)


@services_router.get("/{service_id}", response_model=ServiceRead)
def read_service(service_id: str):
    db_service = service.retrieve(service_id=service_id)
    if db_service is None:
        raise HTTPException(status_code=404, detail="Услуга не найдена")
    return db_service


@services_router.put("/{service_id}", response_model=ServiceRead)
def update_service(
    service_id: str,
    service_update: ServiceUpdate,
):
    existing_service = service.retrieve(service_id)

    if existing_service is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Услуга не найдена",
        )

    updated_service_instance = service.update(service_id, service_update)

    if updated_service_instance is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ошибка обновления услуги",
        )

    return updated_service_instance


@services_router.delete(
    "/{service_id}",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_service(service_id: str):
    deleted_service = service.destroy(service_id)

    if deleted_service is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Услуга не найдена",
        )

    return None
