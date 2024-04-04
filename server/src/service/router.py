from typing import List

from fastapi import APIRouter, Depends, File, UploadFile, status
from fastapi_filter import FilterDepends
from fastapi_pagination.links import Page
from sqlalchemy.orm import Session

from database import get_db
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
from src.service_image.schemas import ServiceImageRead

services_router = APIRouter(prefix="/services", tags=["Services"])
service = ServiceService


@services_router.get("", response_model=Page[ServiceRead])
def paginated_list(
    service_filter: ServiceFilter = FilterDepends(ServiceFilter),
    session: Session = Depends(get_db),
):
    return service(session).paginated_list(service_filter)


@services_router.post("", response_model=ServiceRead)
@rbac(
    roles=[UserRole.ORGANIZATION],
    error_message="Создавать услуги могут только для организации.",
)
def create(
    service_create: ServiceCreate,
    current_user: User = Depends(current_active_user),
    session: Session = Depends(get_db),
):
    return service(session).create(
        service=service_create, current_user=current_user
    )


@services_router.post("/{service_id}/image", response_model=ServiceRead)
@rbac(roles=[UserRole.ORGANIZATION])
def upload_service_image(
    service_id: str,
    image: UploadFile = File(...),
    current_user: User = Depends(current_active_user),
    session: Session = Depends(get_db),
):
    return service(session).upload_service_image(service_id, image)


@services_router.get("/{service_id}", response_model=ServiceRead)
@rbac(roles=[UserRole.ORGANIZATION, UserRole.CLIENT])
def retrieve(
    service_id: str,
    current_user: User = Depends(current_active_user),
    session: Session = Depends(get_db),
):
    return service(session).retrieve(
        service_id=service_id, current_user=current_user
    )


@services_router.put("/{service_id}", response_model=ServiceRead)
@rbac(
    roles=[UserRole.ORGANIZATION],
    error_message="Редактировать услуги могут только организации.",
)
def update(
    service_id: str,
    service_update: ServiceUpdate,
    current_user: User = Depends(current_active_user),
    session: Session = Depends(get_db),
):
    return service(session).update(service_id, service_update)


@services_router.delete(
    "/{service_id}",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
)
@rbac(
    roles=[UserRole.ORGANIZATION],
    error_message="Удалять услуги могут только организации.",
)
def destroy(
    service_id: str,
    current_user: User = Depends(current_active_user),
    session: Session = Depends(get_db),
):
    return service(session).destroy(service_id)


@services_router.get(
    "/{service_id}/images", response_model=List[ServiceImageRead]
)
@rbac(
    roles=[UserRole.ORGANIZATION],
)
def list_service_images(
    service_id: str,
    current_user: User = Depends(current_active_user),
    session: Session = Depends(get_db),
):
    return service(session).list_service_images(service_id)
