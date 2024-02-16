from pydantic import UUID4, BaseModel


class ServiceImageRead(BaseModel):
    id: UUID4
    url: str
    service_id: UUID4

    class Config:
        from_attributes = True
