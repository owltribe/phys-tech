from sqlalchemy.orm import Session

from models import Organization
from src.organization.schemas import OrganizationCreate, OrganizationUpdate


def get_organization(db: Session, organization_id: str):
    return db.query(Organization).filter(Organization.id == organization_id).first()


def get_organizations(db: Session):
    return db.query(Organization).all()


def create_organization(db: Session, organization: OrganizationCreate):
    db_organization = Organization(
        name=organization.name,
        bin=organization.bin,
        address=organization.address,
        contact=organization.contact,
        email=organization.email,
        description=organization.description,
        category=organization.category,
    )
    db.add(db_organization)
    db.commit()
    db.refresh(db_organization)
    return db_organization


def update_organization(db: Session, organization_id: str, updated_organization: OrganizationUpdate):
    db_organization = db.query(Organization).filter(Organization.id == organization_id).first()
    if db_organization:
        for key, value in updated_organization.dict().items():
            setattr(db_organization, key, value)
        db.commit()
        db.refresh(db_organization)
    return db_organization
