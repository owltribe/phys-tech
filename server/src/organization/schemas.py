from typing import Optional

from pydantic import BaseModel, UUID4
from models.organization import Category

class OrganizationCreate(BaseModel):
    name: str
    bin: Optional[str]
    address: Optional[str]
    contact: Optional[str]
    email: str
    description: str
    category: Optional[Category]



class OrganizationRead(BaseModel):
    id: UUID4
    name: str
    bin: Optional[str]
    address: Optional[str]
    contact: Optional[str]
    email: str
    description: str
    category: Optional[Category]

    class Config:
        from_attributes = True


class OrganizationUpdate(BaseModel):
    name: Optional[str]
    bin: Optional[str]
    address: Optional[str]
    contact: Optional[str]
    email: Optional[str]
    description: Optional[str]
    category: Optional[Category]
