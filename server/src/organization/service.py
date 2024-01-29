from fastapi_pagination.ext.sqlalchemy import paginate
from fastapi_pagination.links import Page
from sqlalchemy import select
from sqlalchemy.orm import Session
from src.supabase.service import SupabaseService
from fastapi import UploadFile, HTTPException, status
from sqlalchemy.sql import text

import uuid

from models import Organization, User
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

    async def create_organization(self, organization: OrganizationCreate):
        db_organization = Organization(
            name=organization.name,
            bin=organization.bin,
            address=organization.address,
            contact=organization.contact,
            email=organization.email,
            description=organization.description,
            category=organization.category,
        )
        self.session.add(db_organization)
        self.session.commit()
        self.session.refresh(db_organization)
        return db_organization

    async def update_organization(self, organization_id: str, updated_organization: OrganizationUpdate, user: User):
        db_organization = self.session.query(Organization).filter(Organization.id == organization_id).first()
        if db_organization.owner_id != user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Only the organization owner can update the organization",
            )

        for key, value in updated_organization.dict().items():
            if value is not None:
                setattr(db_organization, key, value)

        if db_organization.name is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Organization name is required and cannot be null."
            )

        self.session.commit()
        self.session.refresh(db_organization)
        return db_organization

    async def update_organization_photo(self, organization_id: str, photo: UploadFile, user: User):
        db_organization = self.session.query(Organization).filter(Organization.id == organization_id).first()
        if db_organization.owner_id != user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Only the organization owner can update the organization photo",
            )

        if photo is not None:
            bucket = "photos"
            filename = str(uuid.uuid4())
            path = f"{db_organization.name}/{filename}"

            file_url = await self.supabase_service.upload_image(bucket, path, photo.file)
            db_organization.photo = file_url

        self.session.commit()
        self.session.refresh(db_organization)
        return db_organization
