from pydantic import BaseModel, UUID4


class ServiceImageRead(BaseModel):
    id: UUID4
    url: str
    service_id: UUID4

    class Config:
        from_attributes = True