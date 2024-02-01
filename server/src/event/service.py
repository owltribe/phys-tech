from fastapi_pagination.ext.sqlalchemy import paginate
from fastapi_pagination.links import Page
from sqlalchemy import select
from sqlalchemy.orm import Session

from models import Event
from src.event.schemas import EventCreate, EventFilter, EventRead, EventUpdate


class EventService:
    def __init__(self, session: Session) -> None:
        self.session = session

    def get_event(self, event_id: str):
        return self.session.query(Event).filter(Event.id == event_id).first()

    def get_events(self, event_filter: EventFilter) -> Page[EventRead]:
        query = select(Event)
        query = event_filter.filter(query)
        query = event_filter.sort(query)

        return paginate(self.session, query)

    def create_event(self, event: EventCreate):
        db_event = Event(
            name=event.name,
            description=event.description,
            start_date=event.start_date,
            start_time=event.start_time,
            duration=event.duration,
            location=event.location,
        )
        self.session.add(db_event)
        self.session.commit()
        self.session.refresh(db_event)
        return db_event

    def update_event(self, event_id: str, updated_event: EventUpdate):
        db_event = self.session.query(Event).filter(Event.id == event_id).first()
        if db_event:
            for key, value in updated_event.dict().items():
                setattr(db_event, key, value)
            self.session.commit()
            self.session.refresh(db_event)
        return db_event

    def delete_event(self, event_id: str):
        db_event = self.session.query(Event).filter(Event.id == event_id).first()
        if db_event:
            self.session.delete(db_event)
            self.session.commit()
        return db_event
