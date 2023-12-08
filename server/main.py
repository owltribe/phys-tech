import uuid

from fastapi import FastAPI
from fastapi_users import FastAPIUsers

from modules.auth.auth import auth_backend
from modules.auth.database import User
from modules.auth.schemas import UserRead, UserCreate
from modules.auth.user_manager import get_user_manager

fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)

app = FastAPI()
app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)