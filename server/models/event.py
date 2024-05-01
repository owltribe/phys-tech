import uuid

from sqlalchemy import UUID, Date, ForeignKey, Integer, String, Time
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class Event(Base):
    __tablename__ = "event"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID, primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)
    start_date: Mapped[Date] = mapped_column(Date)
    start_time: Mapped[Time] = mapped_column(Time)
    duration: Mapped[int] = mapped_column(Integer)
    location: Mapped[str] = mapped_column(String)

    created_by_id: Mapped[uuid.UUID] = mapped_column(
        UUID,
        ForeignKey("user.id", name="fk_event_user", ondelete="CASCADE"),
        nullable=False,
    )
    created_by = relationship(
        "User",
        back_populates="events",
        primaryjoin="User.id == Event.created_by_id",
    )
