import enum
import uuid
from datetime import datetime

from pydantic import computed_field
from sqlalchemy import String, Boolean, Enum, TIMESTAMP, UUID
from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from fastapi_users_db_sqlalchemy import UUID_ID, GUID
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class UserRole(enum.Enum):
    Organization = "Organization"
    Client = "Client"


UserRoleEnum: Enum = Enum(UserRole, name="user_role_enum")


class User(SQLAlchemyBaseUserTableUUID, Base):
    __tablename__ = "user"

    id: Mapped[UUID_ID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    role = mapped_column(UserRoleEnum, nullable=False)
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

    @computed_field
    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"
