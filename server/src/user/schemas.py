import uuid
from typing import Optional

from fastapi_users import schemas
from fastapi_users.models import ID
from pydantic import EmailStr, BaseModel

from models.user import UserRoleEnum


class UserRead(schemas.BaseUser[uuid.UUID]):
    id: ID
    email: EmailStr
    username: str
    role: UserRoleEnum
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False

    class Config:
        from_attributes = True


class UserCreate(schemas.BaseUserCreate):
    email: EmailStr
    username: str
    role: UserRoleEnum
    password: str
    is_active: Optional[bool] = True
    # is_superuser: Optional[bool] = False
    # is_verified: Optional[bool] = False


class UserUpdate(schemas.BaseUserUpdate):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    role: Optional[UserRoleEnum] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None
    is_verified: Optional[bool] = None


class UserProfile(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None
