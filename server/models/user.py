import enum
import uuid
from datetime import datetime

from sqlalchemy import MetaData, Table, Column, String, TIMESTAMP, Boolean, Enum, UUID
from fastapi_users.db import SQLAlchemyBaseUserTableUUID, SQLAlchemyUserDatabase
from fastapi_users_db_sqlalchemy import UUID_ID, GUID
from sqlalchemy.orm import Mapped, mapped_column

from database import Base

metadata = MetaData()


class UserRoleEnum(enum.Enum):
    Organization = "Organization"
    Client = "Client"


user = Table(
    "user",
    metadata,
    Column("id", UUID, primary_key=True),
    Column("email", String, nullable=False),
    Column("username", String, nullable=False),
    Column("registered_at", TIMESTAMP, default=datetime.utcnow),
    Column("role", Enum(UserRoleEnum), nullable=False),
    Column("hashed_password", String, nullable=False),
    Column("is_active", Boolean, default=True, nullable=False),
    Column("is_superuser", Boolean, default=False, nullable=False),
    Column("is_verified", Boolean, default=False, nullable=False),
)


class User(SQLAlchemyBaseUserTableUUID, Base):
    __tablename__ = "user"

    id: Mapped[UUID_ID] = mapped_column(GUID, primary_key=True, default=uuid.uuid4)
    username: Mapped[str] = mapped_column(String, nullable=False)
    registered_at = mapped_column(TIMESTAMP, default=datetime.utcnow)
    role = mapped_column(Enum(UserRoleEnum), nullable=False)
    email: Mapped[str] = mapped_column(
        String(length=320), unique=True, index=True, nullable=False
    )
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
