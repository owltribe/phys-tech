from datetime import date, time
from typing import List, Optional

from fastapi_filter.contrib.sqlalchemy import Filter
from pydantic import UUID4, BaseModel

from models import Event


class EventCreate(BaseModel):
    name: str
    description: str
    start_date: date
    start_time: time
    duration: int
    location: str


class EventRead(BaseModel):
    id: UUID4
    name: str
    description: Optional[str]
    start_date: date
    start_time: time
    duration: Optional[int]
    location: str

    class Config:
        from_attributes = True


class EventUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[date] = None
    start_time: Optional[time] = None
    duration: Optional[int] = None
    location: Optional[str] = None


class EventFilter(Filter):
    order_by: List[str] = ["-start_date"]
    search: Optional[str] = None

    class Constants(Filter.Constants):
        model = Event
        search_model_fields = ["name", "description", "location"]
