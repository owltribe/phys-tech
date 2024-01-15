import uuid
from enum import Enum
from sqlalchemy import String, Enum as SQLEnum, UUID
from sqlalchemy.orm import Mapped, mapped_column
from database import Base


class Category(Enum):
    scientific_organization = "Научная организация"
    university = "Вуз"
    technopark = "Технопарк"
    commercial_laboratory_company = "Коммерческая Лабораторная компания"


class Organization(Base):
    __tablename__ = "organization"

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String, nullable=False)
    bin: Mapped[str] = mapped_column(String, nullable=False)
    address: Mapped[str] = mapped_column(String, nullable=False)
    contact: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)
    category: Mapped[Category] = mapped_column(SQLEnum(Category), nullable=False)
