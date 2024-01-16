from typing import Optional
from datetime import date, time
from pydantic import BaseModel, UUID4


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
