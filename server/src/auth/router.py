import uuid

from fastapi import APIRouter, Depends, status
from fastapi_users import FastAPIUsers
from sqlalchemy.orm import joinedload

from database import DbSession
from models.user import User
from src.auth.auth_backend import auth_backend, current_active_user
from src.auth.schemas import (
    UserRead,
    UserReadWithOrganization,
    UserUpdate,
    UserWithOrganizationCreate,
)
from src.auth.utils import get_user_manager

auth_router = APIRouter(prefix="/auth", tags=["Auth"])

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
async def auth_me(current_user: User = Depends(current_active_user)):
    session = DbSession
    user = session.query(User).options(joinedload(User.organization)).filter(User.id == current_user.id).first()

    return user
