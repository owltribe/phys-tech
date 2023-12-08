import enum
from datetime import datetime

from sqlalchemy import MetaData, Table, Column, String, TIMESTAMP, Boolean, Enum, UUID

metadata = MetaData()


@enum.unique
class UserRole(enum.Enum):
    ORGANIZATION = "Organization"
    CLIENT = "Client"


user = Table(
    "user",
    metadata,
    Column("id", UUID, primary_key=True),
    Column("email", String, nullable=False),
    Column("username", String, nullable=False),
    Column("registered_at", TIMESTAMP, default=datetime.utcnow),
    Column("role", Enum(UserRole), nullable=False),
    Column("hashed_password", String, nullable=False),
    Column("is_active", Boolean, default=True, nullable=False),
    Column("is_superuser", Boolean, default=False, nullable=False),
    Column("is_verified", Boolean, default=False, nullable=False),
)
