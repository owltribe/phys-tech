import uuid
from typing import Optional

from fastapi_users import schemas
from fastapi_users.models import ID
from pydantic import EmailStr

from src.organization.schemas import OrganizationCreate
from models.user import UserRole


class UserRead(schemas.BaseUser[uuid.UUID]):
    id: ID
    email: EmailStr
    first_name: str
    last_name: str
    role: UserRole
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False
    full_name: str
    organization_id: uuid.UUID

    class Config:
        from_attributes = True


class UserCreate(schemas.BaseUserCreate):
    email: EmailStr
    first_name: str
    last_name: str
    role: UserRole
    password: str
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False

class UserWithOrganizationCreate(UserCreate):
    organization_data: Optional[OrganizationCreate] = None


class UserUpdate(schemas.BaseUserUpdate):
    email: Optional[EmailStr] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    role: Optional[UserRole] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None
    is_verified: Optional[bool] = None
    organization_id: Optional[uuid.UUID] = None
