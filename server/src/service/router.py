from fastapi import APIRouter, Depends, status
from fastapi_filter import FilterDepends
from fastapi_pagination.links import Page

from database import DbSession
from models import User, UserRole
from src.auth.auth_backend import current_active_user
from src.auth.rbac import rbac
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
@rbac(
    roles=[UserRole.ORGANIZATION, UserRole.CLIENT],
)
def paginated_list(
    service_filter: ServiceFilter = FilterDepends(ServiceFilter),
):
    return service.paginated_list(service_filter)


@services_router.post("", response_model=ServiceRead)
@rbac(
    roles=[UserRole.ORGANIZATION],
    error_message="Создавать услуги могут только для организации.",
)
def create(
    service_create: ServiceCreate,
    current_user: User = Depends(current_active_user),
):
    return service.create(service=service_create, current_user=current_user)


@services_router.get("/{service_id}", response_model=ServiceRead)
@rbac(roles=[UserRole.ORGANIZATION, UserRole.CLIENT])
def retrieve(service_id: str):
    return service.retrieve(service_id=service_id)


@services_router.put("/{service_id}", response_model=ServiceRead)
@rbac(
    roles=[UserRole.ORGANIZATION],
    error_message="Редактировать услуги могут только организации.",
)
def update(
    service_id: str,
    service_update: ServiceUpdate,
):
    return service.update(service_id, service_update)


@services_router.delete(
    "/{service_id}",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
)
@rbac(
    roles=[UserRole.ORGANIZATION],
    error_message="Удалять услуги могут только организации.",
)
def destroy(service_id: str):
    return service.destroy(service_id)
