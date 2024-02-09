import uuid
from typing import Type

from fastapi import HTTPException, UploadFile, status
from fastapi_pagination.ext.sqlalchemy import paginate
from fastapi_pagination.links import Page
from sqlalchemy import select
from sqlalchemy.orm import Session

from models import Organization, User
from src.organization.schemas import (
    OrganizationCreate,
    OrganizationFilter,
    OrganizationRead,
    OrganizationUpdate,
)
from src.supabase.service import SupabaseService


class OrganizationService:
    def __init__(self, session: Session) -> None:
        self.session = session
        self.supabase_service = SupabaseService(session)

    def paginated_list(
        self, organization_filter: OrganizationFilter
    ) -> Page[OrganizationRead]:
        query = select(Organization)
        query = organization_filter.filter(query)
        query = organization_filter.sort(query)

        return paginate(self.session, query)

    def retrieve(self, organization_id: str) -> Type[Organization]:
        instance = (
            self.session.query(Organization)
            .filter(Organization.id == organization_id)
            .first()
        )

        if instance is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Организация не найдена.",
            )

        return instance

    def retrieve_by_user_id(self, user_id: str) -> Type[Organization] | None:
        instance = (
            self.session.query(Organization)
            .filter(Organization.owner_id == user_id)
            .first()
        )

        if instance is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Организация не найдена.",
            )

        return instance

    def create(self, organization: OrganizationCreate):
        instance = Organization(
            name=organization.name,
            bin=organization.bin,
            address=organization.address,
            contact=organization.contact,
            email=organization.email,
            description=organization.description,
            category=organization.category,
        )
        self.session.add(instance)
        self.session.commit()
        self.session.refresh(instance)
        return instance

    def update(
        self,
        organization_id: str,
        organization_update: OrganizationUpdate,
        user: User,
    ):
        instance = self.retrieve(organization_id)

        if instance.owner_id != user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="У вас нет организации, что редактировать ее.",
            )

        for key, value in organization_update.dict().items():
            if value is not None:
                setattr(instance, key, value)

        self.session.commit()
        self.session.refresh(instance)
        return instance

    async def update_avatar(
        self, organization_id: str, photo: UploadFile, user: User
    ):
        instance = self.retrieve(organization_id)

        if instance.owner_id != user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Только владелец организации может обновить фотографию организации.",
            )

        if photo is not None:
            bucket = "photos"
            filename = str(uuid.uuid4())
            path = f"{instance.name}/{filename}"

            if instance.photo:
                path_to_remove = f"{instance.name}/{instance.photo}"
                self.supabase_service.remove_image(bucket, path_to_remove)

            file_url = await self.supabase_service.upload_image(
                bucket, path, photo.file
            )
            instance.photo = file_url

        self.session.commit()
        self.session.refresh(instance)
        return instance
