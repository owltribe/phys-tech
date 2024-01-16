from typing import List

from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from src.event.schemas import EventCreate, EventRead, EventUpdate
from database import get_db

from src.event import service

events_router = APIRouter(
    prefix="/events",
    tags=["Events"]
)


@events_router.get("", response_model=List[EventRead])
async def list_events(db: Session = Depends(get_db)):
    events = service.get_events(db=db)
    return events


@events_router.post("", response_model=EventRead)
async def create_new_event(event: EventCreate, db: Session = Depends(get_db)):
    event = service.create_event(db=db, event=event)
    return event


@events_router.get("/{event_id}", response_model=EventRead)
async def read_event(event_id: str, db: Session = Depends(get_db)):
    db_event = service.get_event(db=db, event_id=event_id)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Событие не найдено")
    return db_event


@events_router.put("/{event_id}", response_model=EventRead)
def update_event(
        event_id: str,
        updated_event: EventUpdate,
        db: Session = Depends(get_db)
):
    existing_event = service.get_event(db, event_id)

    if existing_event is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Событие не найдено",
        )

    updated_event_instance = service.update_event(db, event_id, updated_event)

    if updated_event_instance is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Ошибка обновления услуги",
        )

    return updated_event_instance


@events_router.delete("/{event_id}", response_model=None, status_code=status.HTTP_204_NO_CONTENT)
def delete_event(
        event_id: str,
        db: Session = Depends(get_db)
):
    deleted_event = service.delete_event(db, event_id)

    if deleted_event is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Услуга не найдена",
        )

    return None
