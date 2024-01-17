import enum
import uuid

from pydantic import computed_field
from sqlalchemy import String, Boolean, Enum, UUID
from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from fastapi_users_db_sqlalchemy import UUID_ID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class UserRole(enum.Enum):
    Organization = "Organization"
    Client = "Client"


class User(SQLAlchemyBaseUserTableUUID, Base):
    __tablename__ = "user"

    id: Mapped[UUID_ID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    role = mapped_column(Enum(UserRole, name="user_role_enum"), nullable=False)
    email: Mapped[str] = mapped_column(
        String(length=320), unique=True, index=True, nullable=False
    )
    first_name: Mapped[str] = mapped_column(String, nullable=False)
    last_name: Mapped[str] = mapped_column(String, nullable=False)
    hashed_password: Mapped[str] = mapped_column(
        String(length=1024), nullable=False
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    is_superuser: Mapped[bool] = mapped_column(
        Boolean, default=False, nullable=False
    )
    is_verified: Mapped[bool] = mapped_column(
        Boolean, default=False, nullable=False
    )

    requested_services = relationship(
        "ServiceRequest",
        back_populates="requested_by",
        primaryjoin="User.id == ServiceRequest.requested_by_id",
        cascade="delete",
        uselist=True
    )

    @computed_field
    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"
