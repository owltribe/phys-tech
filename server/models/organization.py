import enum
import uuid

from sqlalchemy import UUID, Enum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class Category(str, enum.Enum):
    scientific_organization = "Scientific Organization"
    university = "University"
    technopark = "Technopark"
    commercial_laboratory_company = "Commercial laboratory company"


class Organization(Base):
    __tablename__ = "organization"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID, primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String, nullable=False)
    bin: Mapped[str] = mapped_column(String, nullable=False)
    address: Mapped[str] = mapped_column(String, nullable=False)
    contact: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)
    photo: Mapped[str] = mapped_column(String, nullable=True)

    category: Mapped[Category] = mapped_column(Enum(Category), nullable=False)

    owner_id: Mapped[uuid.UUID] = mapped_column(
        UUID,
        ForeignKey(
            "user.id", ondelete="CASCADE", name="fk_organization_owner"
        ),
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
