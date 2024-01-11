import uuid

from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordBearer
from fastapi_users import FastAPIUsers

from models.user import User
from src.user.auth import auth_backend
from src.user.schemas import UserRead
from src.user.utils import get_user_manager

users_router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)
current_active_user = fastapi_users.current_user(active=True)


@users_router.get(
    "/me",
    response_model=UserRead,
    status_code=status.HTTP_200_OK,
)
async def read_users_me_profile(current_user: User = Depends(current_active_user)):
    return current_user
