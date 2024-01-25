from typing import Optional, List

from fastapi_filter.contrib.sqlalchemy import Filter
from pydantic import BaseModel, UUID4

from models import Service


class ServiceCreate(BaseModel):
    name: str
    description: Optional[str]
    expected_result: Optional[str]
    cost: int


class ServiceRead(BaseModel):
    id: UUID4
    name: str
    description: Optional[str]
    expected_result: Optional[str]
    cost: int

    class Config:
        from_attributes = True


class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    expected_result: Optional[str] = None
    cost: Optional[int] = None


class ServiceFilter(Filter):
    order_by: List[str] = None
    search: Optional[str] = None
    organization_id: Optional[UUID4] = None

    class Constants(Filter.Constants):
        model = Service
        search_model_fields = ["name", "description", "result"]
