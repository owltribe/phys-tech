import uuid

from sqlalchemy import MetaData, Table, Column, String, TIMESTAMP, Boolean, Enum, UUID
from fastapi_users.db import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase
from fastapi_users_db_sqlalchemy import UUID_ID, GUID
from sqlalchemy.orm import Mapped, mapped_column

from database import Base

metadata = MetaData()


service = Table(
    "service",
    metadata,
    Column("id", UUID, primary_key=True),
    Column("name", String, nullable=False),
    Column("short_description", String, nullable=False),
    Column("full_description", String, nullable=False),
)

class Service(Base):
    __tablename__ = "service"

    id: Mapped[UUID_ID] = mapped_column(GUID, primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String, nullable=False)
    short_description: Mapped[str] = mapped_column(String, nullable=False)
    full_description: Mapped[str] = mapped_column(String, nullable=False)
    