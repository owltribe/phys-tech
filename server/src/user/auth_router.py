import uuid

from fastapi import APIRouter
from fastapi_users import FastAPIUsers

from models.user import User
from src.user.auth import auth_backend
from src.user.schemas import UserRead, UserCreate, UserUpdate
from src.user.utils import get_user_manager

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
    fastapi_users.get_register_router(UserRead, UserCreate),
)
# auth_router.include_router(
#     fastapi_users.get_users_router(UserRead, UserUpdate),
# )
