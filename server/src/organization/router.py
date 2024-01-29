from fastapi import APIRouter, status, HTTPException, Depends
from fastapi_pagination.links import Page
from fastapi import File, UploadFile
from src.organization.schemas import OrganizationCreate, OrganizationRead, OrganizationUpdate, OrganizationFilter
from database import DbSession
from src.auth.auth_backend import current_active_user
from models import User

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
async def create_new_organization(organization: OrganizationCreate = Depends(), file_obj: UploadFile = File(...)):
    organization = await service.create_organization(organization=organization, file_obj=file_obj)
    return organization


@organizations_router.post("", response_model=OrganizationRead)
async def create_new_organization(organization: OrganizationCreate = Depends()):
    organization = await service.create_organization(organization=organization)
    return organization

@organizations_router.put("/{organization_id}", response_model=OrganizationRead)
async def update_organization(
        organization_id: str,
        updated_organization: OrganizationUpdate,
        user: User = Depends(current_active_user)
):
    existing_organization = service.get_organization(organization_id)

    if existing_organization is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Организации не найдена",
        )

    updated_organization_instance = await service.update_organization(organization_id, updated_organization, user)

    if updated_organization_instance is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ошибка обновления организации",
        )

    return updated_organization_instance

@organizations_router.post("/{organization_id}/photo", response_model=OrganizationRead)
async def upload_photo(
        organization_id: str,
        photo: UploadFile = File(...),
        user: User = Depends(current_active_user)
):
    existing_organization = service.get_organization(organization_id)

    if existing_organization is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Организации не найдена",
        )

    updated_organization_instance = await service.update_organization_photo(organization_id, photo, user)

    if updated_organization_instance is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ошибка обновления фотографии организации",
        )

    return updated_organization_instance
