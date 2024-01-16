from typing import List

from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select
from src.organization.schemas import OrganizationCreate, OrganizationRead, OrganizationUpdate, OrganizationFilter
from database import get_db

from fastapi_filter import FilterDepends, with_prefix

from src.organization import service
from models import Organization

organizations_router = APIRouter(
    prefix="/organizations",
    tags=["Organizations"]
)


@organizations_router.get("", response_model=List[OrganizationRead])
async def list_organizations(
    organization_filter: OrganizationFilter = FilterDepends(OrganizationFilter),
    db: Session = Depends(get_db),
):
    query = select(Organization)
    query = organization_filter.filter(query)
    query = organization_filter.sort(query)
    result = db.execute(query)
    return result.scalars().all()


@organizations_router.post("", response_model=OrganizationRead)
async def create_new_organization(organization: OrganizationCreate, db: Session = Depends(get_db)):
    organization = service.create_organization(db=db, organization=organization)
    return organization


@organizations_router.get("/{organization_id}", response_model=OrganizationRead)
async def read_organization(organization_id: str, db: Session = Depends(get_db)):
    db_organization = service.get_organization(db=db, organization_id=organization_id)
    if db_organization is None:
        raise HTTPException(status_code=404, detail="Услуга не найдена")
    return db_organization


@organizations_router.put("/{organization_id}", response_model=OrganizationRead)
def update_organization(
        organization_id: str,
        updated_organization: OrganizationUpdate,
        db: Session = Depends(get_db)
):
    existing_organization = service.get_organization(db, organization_id)

    if existing_organization is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Услуга не найдена",
        )

    updated_organization_instance = service.update_organization(db, organization_id, updated_organization)

    if updated_organization_instance is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ошибка обновления услуги",
        )

    return updated_organization_instance
