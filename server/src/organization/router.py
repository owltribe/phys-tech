from fastapi import APIRouter, status, HTTPException
from fastapi_pagination.links import Page
from fastapi import File, UploadFile
from src.organization.schemas import OrganizationCreate, OrganizationRead, OrganizationUpdate, OrganizationFilter
from database import DbSession

from fastapi_filter import FilterDepends

from src.organization.service import OrganizationService

organizations_router = APIRouter(
    prefix="/organizations",
    tags=["Organizations"]
)
service = OrganizationService(session=DbSession)


@organizations_router.get("", response_model=Page[OrganizationRead])
async def list_organizations(
        organization_filter: OrganizationFilter = FilterDepends(OrganizationFilter),
):
    return service.get_organizations(organization_filter)


@organizations_router.post("", response_model=OrganizationRead)
def create_new_organization(organization: OrganizationCreate, file_obj: UploadFile = File(...)):
    organization = service.create_organization(organization=organization, file_obj=file_obj)
    return organization


@organizations_router.get("/{organization_id}", response_model=OrganizationRead)
def read_organization(organization_id: str):
    db_organization = service.get_organization(organization_id=organization_id)
    if db_organization is None:
        raise HTTPException(status_code=404, detail="Организация не найдена")
    return db_organization


@organizations_router.put("/{organization_id}", response_model=OrganizationRead)
def update_organization(
        organization_id: str,
        updated_organization: OrganizationUpdate,
):
    existing_organization = service.get_organization(organization_id)

    if existing_organization is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Организации не найдена",
        )

    updated_organization_instance = service.update_organization(organization_id, updated_organization)

    if updated_organization_instance is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ошибка обновления организации",
        )

    return updated_organization_instance
