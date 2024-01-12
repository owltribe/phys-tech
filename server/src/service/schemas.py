from typing import Optional

from pydantic import BaseModel, UUID4


class ServiceCreate(BaseModel):
    name: str
    description: Optional[str]
    result: Optional[str]
    cost: int


class ServiceRead(BaseModel):
    id: UUID4
    name: str
    description: Optional[str]
    result: Optional[str]
    cost: int

    class Config:
        from_attributes = True


class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    result: Optional[str] = None
    cost: Optional[int] = None
