import uuid
from typing import Optional

from pydantic import BaseModel

class SerivceCreate(BaseModel):
    name: str
    short_description: str
    full_description: str

class ServiceRead(BaseModel):
    id: int
    name: str
    short_description: str
    full_description: str

    class Config:
        from_attributes = True

class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    short_description: Optional[str] = None
    full_description: Optional[str] = None

class ServiceDelete(BaseModel):
    id: int
    name: str
    