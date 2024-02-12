from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from fastapi_filter import FilterDepends
from fastapi_pagination.links import Page

from database import DbSession
from models import User, UserRole
from src.auth.auth_backend import current_active_user
from src.auth.rbac import rbac
from src.organization.schemas import (
    OrganizationCreate,
    OrganizationFilter,
    OrganizationRead,
    OrganizationUpdate,
)
from src.organization.service import OrganizationService

organizations_router = APIRouter(
    prefix="/organizations", tags=["Organizations"]
)
service = OrganizationService(session=DbSession)


@organizations_router.get("", response_model=Page[OrganizationRead])
@rbac(roles=[UserRole.ORGANIZATION, UserRole.CLIENT])
def paginated_list(
    organization_filter: OrganizationFilter = FilterDepends(
        OrganizationFilter
    ),
    current_user: User = Depends(current_active_user),
):
    return service.paginated_list(organization_filter)


@organizations_router.post("", response_model=OrganizationRead)
@rbac(roles=[UserRole.ORGANIZATION])
def create(
    organization: OrganizationCreate = Depends(),
    current_user: User = Depends(current_active_user),
):
    return service.create(organization=organization)


@organizations_router.put(
    "/{organization_id}", response_model=OrganizationRead
)
@rbac(roles=[UserRole.ORGANIZATION])
def update(
    organization_id: str,
    updated_organization: OrganizationUpdate,
    current_user: User = Depends(current_active_user),
):
    return service.update(organization_id, updated_organization, current_user)


@organizations_router.post("/photo", response_model=OrganizationRead)
@rbac(roles=[UserRole.ORGANIZATION])
async def upload_photo(
    photo: UploadFile = File(...),
    current_user: User = Depends(current_active_user),
):
    existing_organization = service.retrieve_by_user_id(current_user.id)

    if existing_organization is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Организации не найдена",
        )

    return service.update_avatar(existing_organization.id, photo, current_user)
