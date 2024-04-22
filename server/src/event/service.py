import datetime

import pytz
from fastapi import HTTPException, status
from fastapi_pagination.ext.sqlalchemy import paginate
from fastapi_pagination.links import Page
from sqlalchemy import select
from sqlalchemy.orm import Session

from models import Event
from src.event.schemas import EventCreate, EventFilter, EventRead, EventUpdate


class EventService:
    def __init__(self, session: Session) -> None:
        self.session = session

    def retrieve(self, event_id: str):
        instance = (
            self.session.query(Event).filter(Event.id == event_id).first()
        )
        if not instance:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Событие не найдено",
            )
        return instance

    def paginated_list(self, event_filter: EventFilter) -> Page[EventRead]:
        query = select(Event)

        query = event_filter.filter(query)
        query = event_filter.sort(query)

        return paginate(self.session, query)

    def create(self, event: EventCreate):
        instance = Event(
            name=event.name,
            description=event.description,
            start_date=event.start_date,
            start_time=event.start_time,
            duration=event.duration,
            location=event.location,
        )
        self.session.add(instance)
        self.session.commit()
        self.session.refresh(instance)
        return instance

    def update(self, event_id: str, event_update: EventUpdate):
        instance = self.retrieve(event_id)
        if instance:
            for key, value in event_update.dict().items():
                setattr(instance, key, value)
            self.session.commit()
            self.session.refresh(instance)
        return instance

    def destroy(self, event_id: str):
        instance = self.retrieve(event_id)
        if instance:
            self.session.delete(instance)
            self.session.commit()
        return instance
