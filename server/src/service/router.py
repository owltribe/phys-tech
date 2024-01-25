from fastapi import APIRouter, status, HTTPException, Depends
from fastapi_filter import FilterDepends
from fastapi_pagination.links import Page

from models import User, UserRole
from src.auth.auth_backend import current_active_user
from src.service.service import ServiceService
from src.service.schemas import ServiceCreate, ServiceRead, ServiceUpdate, ServiceFilter
from database import DbSession

services_router = APIRouter(
    prefix="/services",
    tags=["Services"]
)

service = ServiceService(session=DbSession)


@services_router.get("", response_model=Page[ServiceRead])
async def list_services(service_filter: ServiceFilter = FilterDepends(ServiceFilter)):
    return service.get_services(service_filter)


@services_router.post("", response_model=ServiceRead)
async def create_service(service_create: ServiceCreate, current_user: User = Depends(current_active_user)):
    if current_user.role is not UserRole.Organization:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Создание услуг достпуно только для организаций.")

    return service.create_service(service=service_create, current_user=current_user)


@services_router.get("/{service_id}", response_model=ServiceRead)
def read_service(service_id: str):
    db_service = service.get_service(service_id=service_id)
    if db_service is None:
        raise HTTPException(status_code=404, detail="Услуга не найдена")
    return db_service


@services_router.put("/{service_id}", response_model=ServiceRead)
def update_service(
        service_id: str,
        service_update: ServiceUpdate,
):
    existing_service = service.get_service(service_id)

    if existing_service is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Услуга не найдена",
        )

    updated_service_instance = service.update_service(service_id, service_update)

    if updated_service_instance is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ошибка обновления услуги",
        )

    return updated_service_instance


@services_router.delete("/{service_id}", response_model=None, status_code=status.HTTP_204_NO_CONTENT)
def delete_service(service_id: str):
    deleted_service = service.delete_service(service_id)

    if deleted_service is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Услуга не найдена",
        )

    return None
