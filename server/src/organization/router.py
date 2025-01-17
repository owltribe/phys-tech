from fastapi import APIRouter, Depends, File, UploadFile
from fastapi_filter import FilterDepends
from fastapi_pagination.links import Page
from sqlalchemy.orm import Session

from database import get_db
from models import User, UserRole
from src.auth.auth_backend import current_active_user
from src.auth.rbac import rbac
from src.organization.schemas import (
    OrganizationCreate,
    OrganizationFilter,
    OrganizationRead,
    OrganizationRetrieve,
    OrganizationUpdate,
)
from src.organization.service import OrganizationService

organizations_router = APIRouter(
    prefix="/organizations", tags=["Organizations"]
)
service = OrganizationService


@organizations_router.get("", response_model=Page[OrganizationRead])
def paginated_list(
    organization_filter: OrganizationFilter = FilterDepends(
        OrganizationFilter
    ),
    session: Session = Depends(get_db),
):
    return service(session).paginated_list(organization_filter)


@organizations_router.get(
    "/{organization_id}", response_model=OrganizationRetrieve
)
def retrieve(
    organization_id: str,
    session: Session = Depends(get_db),
):
    return service(session).retrieve(organization_id)


@organizations_router.post("", response_model=OrganizationRead)
@rbac(roles=[UserRole.ORGANIZATION])
def create(
    organization: OrganizationCreate = Depends(),
    current_user: User = Depends(current_active_user),
    session: Session = Depends(get_db),
):
    return service(session).create(organization=organization)


@organizations_router.put(
    "/{organization_id}", response_model=OrganizationRead
)
@rbac(roles=[UserRole.ORGANIZATION])
def update(
    organization_id: str,
    updated_organization: OrganizationUpdate,
    current_user: User = Depends(current_active_user),
    session: Session = Depends(get_db),
):
    return service(session).update(
        organization_id, updated_organization, current_user
    )


@organizations_router.post("/photo", response_model=None)
@rbac(roles=[UserRole.ORGANIZATION])
def upload_profile_picture(
    photo: UploadFile = File(...),
    current_user: User = Depends(current_active_user),
    session: Session = Depends(get_db),
):
    return service(session).upload_profile_picture(current_user, file=photo)
