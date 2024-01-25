from fastapi_pagination.ext.sqlalchemy import paginate
from fastapi_pagination.links import Page
from sqlalchemy import select
from sqlalchemy.orm import Session
from src.supabase.service import SupabaseService
from fastapi import UploadFile

from models import Organization
from src.organization.schemas import OrganizationCreate, OrganizationUpdate, OrganizationRead, OrganizationFilter


class OrganizationService:
    def __init__(self, session: Session) -> None:
        self.session = session
        self.supabase_service = SupabaseService(session)

    def get_organization(self, organization_id: str):
        return self.session.query(Organization).filter(Organization.id == organization_id).first()

    def get_organization_by_user_id(self, user_id: str):
        return self.session.query(Organization).filter(Organization.owner_id == user_id).first()

    def get_organizations(self, organization_filter: OrganizationFilter) -> Page[OrganizationRead]:
        query = select(Organization)
        query = organization_filter.filter(query)
        query = organization_filter.sort(query)

        return paginate(self.session, query)

    def create_organization(self, organization: OrganizationCreate, file_obj: UploadFile):
        bucket = "photos"
        path = f"{organization.name}/{file_obj.filename}"
        file_url = self.supabase_service.upload_to_supabase(bucket, path, file_obj.file)

        db_organization = Organization(
            name=organization.name,
            bin=organization.bin,
            address=organization.address,
            contact=organization.contact,
            email=organization.email,
            description=organization.description,
            category=organization.category,
            file_url=file_url,
        )
        self.session.add(db_organization)
        self.session.commit()
        self.session.refresh(db_organization)
        return db_organization

    def update_organization(self, organization_id: str, updated_organization: OrganizationUpdate):
        db_organization = self.session.query(Organization).filter(Organization.id == organization_id).first()
        if db_organization:
            for key, value in updated_organization.dict().items():
                setattr(db_organization, key, value)
            self.session.commit()
            self.session.refresh(db_organization)
        return db_organization
