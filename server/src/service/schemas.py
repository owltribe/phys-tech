from typing import List, Optional

from fastapi_filter.contrib.sqlalchemy import Filter
from pydantic import UUID4, BaseModel

from models import Service
from src.organization.schemas import OrganizationRead
from src.service_image.schemas import ServiceImageRead


class ServiceCreate(BaseModel):
    name: str
    description: Optional[str]
    expected_result: Optional[str]
    cost: int
    technical_specifications: Optional[str]
    sample_preparation: Optional[str]
    has_certificate: Optional[bool]


class ServiceRead(BaseModel):
    id: UUID4
    name: str
    description: Optional[str]
    expected_result: Optional[str]
    cost: int
    service_images: List[ServiceImageRead] = []
    organization: OrganizationRead
    technical_specifications: Optional[str]
    sample_preparation: Optional[str]
    has_certificate: Optional[bool]

    is_editable: bool = False

    class Config:
        from_attributes = True


class ServiceRetrieve(BaseModel):
    id: UUID4
    name: str
    description: Optional[str]
    expected_result: Optional[str]
    cost: int
    service_images: List[ServiceImageRead] = []
    organization: OrganizationRead
    technical_specifications: Optional[str]
    sample_preparation: Optional[str]
    has_certificate: Optional[bool]

    is_editable: bool = False

    class Config:
        from_attributes = True


class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    expected_result: Optional[str] = None
    cost: Optional[int] = None
    technical_specifications: Optional[str] = None
    sample_preparation: Optional[str] = None
    has_certificate: Optional[bool] = None


class ServiceFilter(Filter):
    order_by: List[str] = ["-created_at"]
    search: Optional[str] = None
    organization_id: Optional[UUID4] = None

    class Constants(Filter.Constants):
        model = Service
        search_model_fields = ["name", "description", "expected_result"]
