from datetime import datetime
from typing import List, Optional

from fastapi_filter import FilterDepends, with_prefix
from fastapi_filter.contrib.sqlalchemy import Filter
from pydantic import UUID4, BaseModel

from models import ServiceRequest, ServiceRequestStatus
from src.auth.schemas import UserRead
from src.service.schemas import ServiceFilter, ServiceRead, ServiceRetrieve


class ServiceRequestCreate(BaseModel):
    service_id: Optional[str]
    comment: Optional[str] = None


class ServiceRequestRead(BaseModel):
    id: UUID4
    status: ServiceRequestStatus
    service: ServiceRead
    requested_by: UserRead
    created_at: datetime

    class Config:
        from_attributes = True


class ServiceRequestRetrieve(BaseModel):
    id: UUID4
    status: ServiceRequestStatus
    comment: Optional[str]
    service: ServiceRetrieve
    requested_by: UserRead
    created_at: datetime

    class Config:
        from_attributes = True


class ServiceRequestUpdate(BaseModel):
    status: Optional[ServiceRequestStatus]
    service_id: Optional[str]
    requested_by_id: Optional[str]


class ServiceRequestFilter(Filter):
    order_by: List[str] = ["created_at"]
    search: Optional[str] = None
    status: Optional[ServiceRequestStatus] = None
    requested_by_id: Optional[str] = None
    service: Optional[ServiceFilter] = FilterDepends(
        with_prefix("service", ServiceFilter)
    )

    class Constants(Filter.Constants):
        model = ServiceRequest
        search_model_fields = ["status", "requested_by_id"]
