import uuid

from fastapi import APIRouter, Depends, File, UploadFile, status
from fastapi_users import FastAPIUsers
from sqlalchemy.orm import joinedload

from database import DbSession, SessionLocal
from models.user import User, UserRole
from src.auth.auth_backend import auth_backend, current_active_user
from src.auth.rbac import rbac
from src.auth.schemas import (
    UserRead,
    UserReadWithOrganization,
    UserUpdate,
    UserWithOrganizationCreate,
)
from src.auth.service import UserService
from src.auth.utils import get_user_manager

auth_router = APIRouter(prefix="/auth", tags=["Auth"])
service = UserService(session=DbSession)

fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)

auth_router.include_router(
    fastapi_users.get_auth_router(auth_backend),
)
auth_router.include_router(
    fastapi_users.get_register_router(UserRead, UserWithOrganizationCreate),
)
auth_router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
)


@auth_router.get(
    "/me/profile",
    response_model=UserReadWithOrganization,
    status_code=status.HTTP_200_OK,
)
@rbac(roles=[UserRole.ORGANIZATION, UserRole.CLIENT])
def auth_me(current_user: User = Depends(current_active_user)):
    return service.retrieve(current_user.id)


@auth_router.post(
    "/me/avatar",
    response_model=UserRead,
    status_code=status.HTTP_200_OK,
)
@rbac(roles=[UserRole.ORGANIZATION, UserRole.CLIENT])
def upload_my_avatar(
    image: UploadFile = File(...),
    current_user: User = Depends(current_active_user),
):
    return service.upload_avatar(current_user, image)
