import uuid
from typing import Optional

from fastapi_users import schemas
from fastapi_users.models import ID
from pydantic import EmailStr, constr

from models.user import UserRole
from src.organization.schemas import OrganizationCreate, OrganizationRead


class UserRead(schemas.BaseUser[uuid.UUID]):
    id: ID
    avatar: Optional[str] = None
    email: EmailStr
    contact: Optional[str] = None
    first_name: str
    last_name: str
    role: UserRole
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False
    full_name: str

    class Config:
        from_attributes = True


class UserReadWithOrganization(UserRead):
    organization: Optional[OrganizationRead] = None


class UserCreate(schemas.BaseUserCreate):
    email: EmailStr
    contact: constr(pattern=r"^(\+7|8)7\d{9}$")  # Phone number pattern
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
    contact: constr(pattern=r"^(\+7|8)7\d{9}$")
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    role: Optional[UserRole] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None
    is_verified: Optional[bool] = None
    organization_id: Optional[uuid.UUID] = None
