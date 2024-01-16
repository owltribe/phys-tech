from typing import Optional
from typing import List

from pydantic import BaseModel, UUID4
from models.organization import Category
from models import Organization

from fastapi_filter.contrib.sqlalchemy import Filter

class OrganizationCreate(BaseModel):
    name: str
    bin: Optional[str]
    address: Optional[str]
    contact: Optional[str]
    email: str
    description: str
    category: Optional[Category]



class OrganizationRead(BaseModel):
    id: UUID4
    name: str
    bin: Optional[str]
    address: Optional[str]
    contact: Optional[str]
    email: str
    description: str
    category: Optional[Category]

    class Config:
        from_attributes = True


class OrganizationUpdate(BaseModel):
    name: Optional[str]
    bin: Optional[str]
    address: Optional[str]
    contact: Optional[str]
    email: Optional[str]
    description: Optional[str]
    category: Optional[Category]

class OrganizationFilter(Filter):
    name: Optional[str] = None
    name__ilike: Optional[str] = None
    name__like: Optional[str] = None
    name__neq: Optional[str] = None

    order_by: List[str] = None
    search: Optional[str] = None

    class Constants(Filter.Constants):
        model = Organization
        search_model_fields = ["name"]
