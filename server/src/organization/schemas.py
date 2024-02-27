from typing import List, Optional

from fastapi_filter.contrib.sqlalchemy import Filter
from pydantic import UUID4, BaseModel, constr

from models import Organization
from models.organization import OrganizationCategory


class OrganizationCreate(BaseModel):
    name: str
    bin: str
    address: str
    contact: constr(pattern=r"^(\+7|8)7\d{9}$")  # Phone number pattern
    email: str
    description: str
    category: OrganizationCategory


class OrganizationRead(BaseModel):
    id: UUID4
    name: str
    bin: str
    address: str
    contact: str
    email: str
    description: str
    category: OrganizationCategory
    photo: Optional[str]

    class Config:
        from_attributes = True


class ServiceItem(BaseModel):
    id: UUID4
    name: str
    cost: int
    organization: OrganizationRead

    class Config:
        from_attributes = True


class OrganizationRetrieve(BaseModel):
    id: UUID4
    name: str
    bin: Optional[str]
    address: Optional[str]
    contact: Optional[str]
    email: str
    description: str
    category: Optional[OrganizationCategory]
    services: List[ServiceItem]
    photo: Optional[str]

    class Config:
        from_attributes = True


class OrganizationUpdate(BaseModel):
    name: str
    bin: str
    address: str
    contact: constr(pattern=r"^(\+7|8)7\d{9}$")  # Phone number pattern
    email: str
    description: str
    category: str


class OrganizationFilter(Filter):
    order_by: List[str] = ["-created_at"]
    search: Optional[str] = None
    category__in: Optional[List[OrganizationCategory]] = None

    class Constants(Filter.Constants):
        model = Organization
        search_model_fields = [
            "name",
            "description",
            "email",
            "contact",
            "bin",
        ]
