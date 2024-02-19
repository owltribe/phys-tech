from fastapi import APIRouter, Depends, status
from fastapi_filter import FilterDepends
from fastapi_pagination.links import Page

from database import DbSession
from models import User, UserRole
from src.auth.auth_backend import current_active_user
from src.auth.rbac import rbac
from src.service_request.schemas import (
    ServiceRequestCreate,
    ServiceRequestFilter,
    ServiceRequestRead,
    ServiceRequestRetrieve,
    ServiceRequestUpdate,
)
from src.service_request.service import ServiceRequestService

service_request_router = APIRouter(
    prefix="/service-requests", tags=["Service Requests"]
)

service = ServiceRequestService(session=DbSession)


@service_request_router.get("", response_model=Page[ServiceRequestRead])
# @rbac(
#     roles=[UserRole.ORGANIZATION, UserRole.CLIENT],
# )
def paginated_list(
    service_request_filter: ServiceRequestFilter = FilterDepends(
        ServiceRequestFilter
    ),
    # current_user: User = Depends(current_active_user),
):
    return service.paginated_list(service_request_filter)


@service_request_router.post("", response_model=ServiceRequestRead)
@rbac(
    roles=[UserRole.CLIENT],
)
def create(
    service_request_create: ServiceRequestCreate,
    current_user: User = Depends(current_active_user),
):
    return service.create(
        service_request_create=service_request_create,
        requested_by=current_user,
    )


@service_request_router.get(
    "/{service_request_id}", response_model=ServiceRequestRetrieve
)
@rbac(
    roles=[UserRole.ORGANIZATION, UserRole.CLIENT],
)
def retrieve(
    service_request_id: str,
    current_user: User = Depends(current_active_user),
):
    return service.retrieve(service_request_id=service_request_id)


@service_request_router.put(
    "/{service_request_id}", response_model=ServiceRequestRead
)
@rbac(
    roles=[UserRole.ORGANIZATION],
)
def update(
    service_request_id: str,
    service_request_update: ServiceRequestUpdate,
    current_user: User = Depends(current_active_user),
):
    return service.update(service_request_id, service_request_update)


@service_request_router.delete(
    "/{service_request_id}",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
)
@rbac(
    roles=[UserRole.ORGANIZATION],
)
def delete(
    service_request_id: str,
    current_user: User = Depends(current_active_user),
):
    return service.delete(service_request_id)
