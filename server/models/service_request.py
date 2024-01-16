import uuid

from sqlalchemy import UUID, String
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class ServiceRequest(Base):
    __tablename__ = "service_request"

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String, nullable=False)
