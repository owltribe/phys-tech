import uuid

from sqlalchemy import UUID, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class Service(Base):
    __tablename__ = "service"

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=True)
    expected_result: Mapped[str] = mapped_column(String, nullable=True)
    cost: Mapped[int] = mapped_column(Integer, nullable=False)

    organization_id: Mapped[uuid.UUID] = mapped_column(
        UUID,
        ForeignKey(
            "organization.id",
            name="fk_service_organization",
            ondelete="CASCADE",
        ),
    )
    organization = relationship("Organization", back_populates="services")

    service_requests = relationship("ServiceRequest", back_populates="service", uselist=True)
