from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_filter import FilterDepends
from fastapi_pagination.links import Page
from sqlalchemy.orm import Session

from database import DbSession
from src.event.schemas import EventCreate, EventFilter, EventRead, EventUpdate
from src.event.service import EventService

events_router = APIRouter(prefix="/events", tags=["Events"])
service = EventService(session=DbSession)


@events_router.get("", response_model=Page[EventRead])
async def list_events(event_filter: EventFilter = FilterDepends(EventFilter)):
    return service.get_events(event_filter)


@events_router.post("", response_model=EventRead)
async def create_new_event(event: EventCreate):
    event = service.create_event(event=event)
    return event


@events_router.get("/{event_id}", response_model=EventRead)
async def read_event(event_id: str):
    db_event = service.get_event(event_id=event_id)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Событие не найдено")
    return db_event


@events_router.put("/{event_id}", response_model=EventRead)
def update_event(
    event_id: str,
    updated_event: EventUpdate,
):
    existing_event = service.get_event(event_id)

    if existing_event is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Событие не найдено",
        )

    updated_event_instance = service.update_event(event_id, updated_event)

    if updated_event_instance is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ошибка обновления услуги",
        )

    return updated_event_instance


@events_router.delete(
    "/{event_id}", response_model=None, status_code=status.HTTP_204_NO_CONTENT
)
def delete_event(
    event_id: str,
):
    deleted_event = service.delete_event(event_id)

    if deleted_event is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Услуга не найдена",
        )

    return None
