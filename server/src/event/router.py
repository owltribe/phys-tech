from fastapi import APIRouter, Depends, status
from fastapi_filter import FilterDepends
from fastapi_pagination.links import Page

from database import DbSession
from models import User, UserRole
from src.auth.auth_backend import current_active_user
from src.auth.rbac import rbac
from src.event.schemas import EventCreate, EventFilter, EventRead, EventUpdate
from src.event.service import EventService

events_router = APIRouter(prefix="/events", tags=["Events"])
service = EventService(session=DbSession)


@events_router.get("", response_model=Page[EventRead])
@rbac(roles=[UserRole.ORGANIZATION, UserRole.CLIENT])
def paginated_list(
    event_filter: EventFilter = FilterDepends(EventFilter),
    current_user: User = Depends(current_active_user),
):
    return service.paginated_list(event_filter)


@events_router.post("", response_model=EventRead)
@rbac(roles=[UserRole.ORGANIZATION])
def create(
    event: EventCreate, current_user: User = Depends(current_active_user)
):
    return service.create(event=event)


@events_router.get("/{event_id}", response_model=EventRead)
@rbac(roles=[UserRole.ORGANIZATION, UserRole.CLIENT])
def retrieve(event_id: str, current_user: User = Depends(current_active_user)):
    return service.retrieve(event_id)


@events_router.put("/{event_id}", response_model=EventRead)
@rbac(roles=[UserRole.ORGANIZATION])
def update(
    event_id: str,
    updated_event: EventUpdate,
    current_user: User = Depends(current_active_user),
):
    return service.update(event_id, updated_event)


@events_router.delete(
    "/{event_id}", response_model=None, status_code=status.HTTP_204_NO_CONTENT
)
@rbac(roles=[UserRole.ORGANIZATION])
def destroy(event_id: str, current_user: User = Depends(current_active_user)):
    return service.destroy(event_id)
