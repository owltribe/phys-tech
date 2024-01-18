from typing import List, Optional

from fastapi_filter.contrib.sqlalchemy import Filter
from pydantic import BaseModel, UUID4

from models import ServiceRequest, ServiceRequestStatus
from src.auth.schemas import UserRead
from src.service.schemas import ServiceRead


class ServiceRequestCreate(BaseModel):
    service_id: Optional[str]
    # requested_by_id: Optional[str]


class ServiceRequestRead(BaseModel):
    id: UUID4
    status: ServiceRequestStatus
    service: ServiceRead
    requested_by: UserRead

    class Config:
        from_attributes = True


class ServiceRequestUpdate(BaseModel):
    status: Optional[ServiceRequestStatus]
    service_id: Optional[str]
    requested_by_id: Optional[str]


class ServiceRequestFilter(Filter):
    order_by: List[str] = None
    search: Optional[str] = None
    status: Optional[ServiceRequestStatus] = None
    requested_by_id__eq: Optional[str] = None

    class Constants(Filter.Constants):
        model = ServiceRequest
        search_model_fields = ["status", "requested_by_id"]
