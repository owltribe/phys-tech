import enum
import uuid

from sqlalchemy import UUID, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class ServiceRequestStatus(enum.Enum):
    PENDING = "Pending"
    APPROVED = "Approved"
    REJECTED = "Rejected"
    COMPLETED = "Completed"


class ServiceRequest(Base):
    __tablename__ = "service_request"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID, primary_key=True, default=uuid.uuid4
    )
    status: Mapped[ServiceRequestStatus] = mapped_column(
        Enum(ServiceRequestStatus), default=ServiceRequestStatus.PENDING
    )

    service_id: Mapped[uuid.UUID] = mapped_column(
        UUID,
        ForeignKey("service.id", name="fk_service_request_service"),
        nullable=False,
    )
    service = relationship("Service", back_populates="service_requests")

    requested_by_id: Mapped[uuid.UUID] = mapped_column(
        UUID,
        ForeignKey(
            "user.id", name="fk_service_request_user", ondelete="CASCADE"
        ),
        nullable=False,
    )
    requested_by = relationship(
        "User",
        back_populates="requested_services",
        primaryjoin="User.id == ServiceRequest.requested_by_id",
    )
