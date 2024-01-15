from typing import List

from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from src.service.schemas import ServiceCreate, ServiceRead, ServiceUpdate
from database import get_db

from src.organization import service

organizations_router = APIRouter(
    prefix="/organizations",
    tags=["Organizations"]
)


@services_router.get("", response_model=List[ServiceRead])
async def list_services(db: Session = Depends(get_db)):
    services = service.get_services(db=db)
    return services


@services_router.post("", response_model=ServiceRead)
async def create_new_service(service: ServiceCreate, db: Session = Depends(get_db)):
    service = service.create_service(db=db, service=service)
    return service


@services_router.get("/{organization_id}", response_model=ServiceRead)
async def read_service(organization_id: str, db: Session = Depends(get_db)):
    db_service = service.get_organization(db=db, organization_id=organization_id)
    if db_service is None:
        raise HTTPException(status_code=404, detail="Услуга не найдена")
    return db_service


@services_router.put("/{organization_id}", response_model=ServiceRead)
def update_organization(
        organization_id: str,
        updated_service: ServiceUpdate,
        db: Session = Depends(get_db)
):
    existing_service = service.get_organization(db, organization_id)

    if existing_service is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Услуга не найдена",
        )

    updated_service_instance = service.update_organization(db, service_id, updated_service)

    if updated_service_instance is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ошибка обновления услуги",
        )

    return updated_service_instance
