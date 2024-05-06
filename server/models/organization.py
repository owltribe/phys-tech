import enum
import uuid

from sqlalchemy import UUID, Enum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class OrganizationCategory(str, enum.Enum):
    SCIENTIFIC_INSTITUTE = "Scientific Institute"
    UNIVERSITY = "University"
    COMPANY = "Company"


class Organization(Base):
    __tablename__ = "organization"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID, primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String)
    bin: Mapped[str] = mapped_column(String)
    address: Mapped[str] = mapped_column(String)
    contact: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String)
    photo: Mapped[str] = mapped_column(String, nullable=True)

    category: Mapped[OrganizationCategory] = mapped_column(
        Enum(OrganizationCategory, name="organization_category_enum"),
        default=OrganizationCategory.SCIENTIFIC_INSTITUTE,
        nullable=False,
    )

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

    def __str__(self):
        return f"{self.id}, {self.name}, {self.email}"
