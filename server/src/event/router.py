from fastapi import APIRouter, Depends, status
from fastapi_filter import FilterDepends
from fastapi_pagination.links import Page
from sqlalchemy.orm import Session

from database import get_db
from models import User, UserRole
from src.auth.auth_backend import current_active_user
from src.auth.rbac import rbac
from src.event.schemas import EventCreate, EventFilter, EventRead, EventUpdate
from src.event.service import EventService

events_router = APIRouter(prefix="/events", tags=["Events"])
service = EventService


@events_router.get("", response_model=Page[EventRead])
def paginated_list(
    event_filter: EventFilter = FilterDepends(EventFilter),
    session: Session = Depends(get_db),
):
    return service(session).paginated_list(event_filter)


@events_router.post("", response_model=EventRead)
@rbac(roles=[UserRole.ORGANIZATION])
def create(
    event: EventCreate,
    current_user: User = Depends(current_active_user),
    session: Session = Depends(get_db),
):
    return service(session).create(event=event)


@events_router.get("/{event_id}", response_model=EventRead)
@rbac(roles=[UserRole.ORGANIZATION, UserRole.CLIENT])
def retrieve(
    event_id: str,
    current_user: User = Depends(current_active_user),
    session: Session = Depends(get_db),
):
    return service(session).retrieve(event_id)


@events_router.put("/{event_id}", response_model=EventRead)
@rbac(roles=[UserRole.ORGANIZATION])
def update(
    event_id: str,
    updated_event: EventUpdate,
    current_user: User = Depends(current_active_user),
    session: Session = Depends(get_db),
):
    return service(session).update(event_id, updated_event)


@events_router.delete(
    "/{event_id}", response_model=None, status_code=status.HTTP_204_NO_CONTENT
)
@rbac(roles=[UserRole.ORGANIZATION])
def destroy(
    event_id: str,
    current_user: User = Depends(current_active_user),
    session: Session = Depends(get_db),
):
    return service(session).destroy(event_id)
