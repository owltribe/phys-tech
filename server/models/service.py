import uuid

from sqlalchemy import String, Integer, UUID
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class Service(Base):
    __tablename__ = "service"

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String)
    result: Mapped[str] = mapped_column(String)
    cost: Mapped[int] = mapped_column(Integer, nullable=False)
    