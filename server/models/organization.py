import enum
import uuid

from database import Base
from sqlalchemy import UUID, Enum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Category(enum.Enum):
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

    category: Mapped[Category] = mapped_column(Enum(Category), nullable=False)

    owner_id: Mapped[uuid.UUID] = mapped_column(
        UUID,
        ForeignKey("user.id", ondelete="CASCADE", name="fk_organization_owner"),
        nullable=True,
    )
    owner = relationship(
        "User",
        back_populates="organization",
        primaryjoin="User.id == Organization.owner_id",
        uselist=False,
    )

    services = relationship(
        "Service",
        back_populates="organization",
        cascade="delete",
        uselist=True,
    )
