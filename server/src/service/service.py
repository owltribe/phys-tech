from fastapi_pagination.links import Page
from fastapi_pagination.ext.sqlalchemy import paginate
from sqlalchemy import select
from sqlalchemy.orm import Session

from models import Service
from src.service.schemas import ServiceCreate, ServiceUpdate, ServiceRead, ServiceFilter


class ServiceService:
    def __init__(self, session: Session) -> None:
        self.session = session

    def get_services(self, service_filter: ServiceFilter) -> Page[ServiceRead]:
        query = select(Service)
        query = service_filter.filter(query)
        query = service_filter.sort(query)

        return paginate(self.session, query)

    def get_service(self, service_id: str):
        return self.session.query(Service).filter(Service.id == service_id).first()

    def create_service(self, service: ServiceCreate):
        db_service = Service(
            organization_id="e6f3b6f5-05a7-48b5-bdfa-70e2f77f78a1",
            name=service.name,
            description=service.description,
            expected_result=service.expected_result,
            cost=service.cost,
        )
        self.session.add(db_service)
        self.session.commit()
        self.session.refresh(db_service)
        return db_service

    def update_service(self, service_id: str, updated_service: ServiceUpdate):
        db_service = self.session.query(Service).filter(Service.id == service_id).first()
        if db_service:
            for key, value in updated_service.dict().items():
                setattr(db_service, key, value)
            self.session.commit()
            self.session.refresh(db_service)
        return db_service

    def delete_service(self, service_id: str):
        db_service = self.session.query(Service).filter(Service.id == service_id).first()
        if db_service:
            self.session.delete(db_service)
            self.session.commit()
        return db_service

# TODO uncomment when organization entity relation is added
# def get_services_by_organization_id(db: Session, organization_id: str):
#     return db.query(Service).filter(Service.organization_id == organization_id)
