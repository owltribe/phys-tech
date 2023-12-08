import uuid
from typing import Optional

from fastapi_users import schemas
from pydantic import EmailStr

from models.models import UserRole


class UserRead(schemas.BaseUser[uuid.UUID]):
    id: str
    email: EmailStr
    username: str
    role: UserRole
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False

    class Config:
        from_attributes = True


class UserCreate(schemas.BaseUserCreate):
    email: EmailStr
    username: str
    role: UserRole
    password: str
    is_active: Optional[bool] = True
    # is_superuser: Optional[bool] = False
    # is_verified: Optional[bool] = False


class UserUpdate(schemas.BaseUserUpdate):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    role: Optional[UserRole] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None
    is_verified: Optional[bool] = None
