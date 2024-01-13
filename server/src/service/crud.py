from sqlalchemy.orm import Session

from models import Service
from src.service.schemas import ServiceCreate, ServiceUpdate


def get_service(db: Session, service_id: str):
    return db.query(Service).filter(Service.id == service_id).first()


def get_services(db: Session):
    return db.query(Service).all()


def create_service(db: Session, service: ServiceCreate):
    db_service = Service(
        name=service.name,
        description=service.description,
        result=service.result,
        cost=service.cost,
    )
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service


def update_service(db: Session, service_id: str, updated_service: ServiceUpdate):
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if db_service:
        for key, value in updated_service.dict().items():
            setattr(db_service, key, value)
        db.commit()
        db.refresh(db_service)
    return db_service


def delete_service(db: Session, service_id: str):
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if db_service:
        db.delete(db_service)
        db.commit()
    return db_service

# TODO uncomment when organization entity relation exist
# def get_services_by_organization_id(db: Session, organization_id: str):
#     return db.query(Service).filter(Service.organization_id == organization_id)
