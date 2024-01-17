import uuid

from fastapi import APIRouter
from fastapi_users import FastAPIUsers

from models.user import User
from src.auth.auth_backend import auth_backend
from src.auth.schemas import UserRead, UserCreate, UserUpdate, UserWithOrganizationCreate
from src.auth.utils import get_user_manager

auth_router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

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
