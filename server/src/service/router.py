from typing import List

from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from src.service.schemas import ServiceCreate, ServiceRead, ServiceUpdate
from database import get_db

from src.service import crud

services_router = APIRouter(
    prefix="/services",
    tags=["Services"]
)


@services_router.get("", response_model=List[ServiceRead])
async def read_services(db: Session = Depends(get_db)):
    services = crud.get_services(db=db)
    return services


@services_router.post("", response_model=ServiceRead)
async def create_new_service(service: ServiceCreate, db: Session = Depends(get_db)):
    service = crud.create_service(db=db, service=service)
    return service


@services_router.post("/{service_id}", response_model=ServiceRead)
async def read_service(service_id: str, db: Session = Depends(get_db)):
    db_service = crud.get_service(db=db, service_id=service_id)
    if db_service is None:
        raise HTTPException(status_code=404, detail="Услуга не найдена")
    return db_service


@services_router.put("/{service_id}", response_model=ServiceRead)
def update_service(
        service_id: str,
        updated_service: ServiceUpdate,
        db: Session = Depends(get_db)
):
    existing_service = crud.get_service(db, service_id)

    if existing_service is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Услуга не найдена",
        )

    updated_service_instance = crud.update_service(db, service_id, updated_service)

    if updated_service_instance is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ошибка обновления услуги",
        )

    return updated_service_instance


@services_router.delete("/{service_id}", response_model=None, status_code=status.HTTP_204_NO_CONTENT)
def delete_service(
        service_id: str,
        db: Session = Depends(get_db)
):
    deleted_service = crud.delete_service(db, service_id)

    if deleted_service is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Услуга не найдена",
        )

    return None
