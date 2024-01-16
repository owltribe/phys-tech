from sqlalchemy.orm import Session

from models import Event
from src.event.schemas import EventCreate, EventUpdate


def get_event(db: Session, event_id: str):
    return db.query(Event).filter(Event.id == event_id).first()


def get_events(db: Session):
    return db.query(Event).all()


def create_event(db: Session, event: EventCreate):
    db_event = Event(
        name=event.name,
        description=event.description,
        start_date=event.start_date,
        start_time=event.start_time,
        duration=event.duration,
        location=event.location
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event


def update_event(db: Session, event_id: str, updated_event: EventUpdate):
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if db_event:
        for key, value in updated_event.dict().items():
            setattr(db_event, key, value)
        db.commit()
        db.refresh(db_event)
    return db_event


def delete_event(db: Session, event_id: str):
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if db_event:
        db.delete(db_event)
        db.commit()
    return db_event