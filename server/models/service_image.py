import uuid

from sqlalchemy import UUID, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class ServiceImage(Base):
    __tablename__ = "service_image"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID, primary_key=True, default=uuid.uuid4
    )
    url: Mapped[str] = mapped_column(String, nullable=False)
    service_id: Mapped[uuid.UUID] = mapped_column(
        UUID,
        ForeignKey("service.id", name="fk_service_image", ondelete="CASCADE"),
        nullable=False,
    )
    service = relationship("Service", back_populates="service_images")
