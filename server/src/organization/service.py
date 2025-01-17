from typing import Type

from fastapi import File, HTTPException, UploadFile, status
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
from src.s3.service import S3Service


class OrganizationService:
    def __init__(self, session: Session) -> None:
        self.session = session
        self.s3_service = S3Service()

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

    def upload_profile_picture(
        self, current_user: User, file: UploadFile = File(...)
    ):
        instance = self.retrieve_by_user_id(user_id=current_user.id)

        if not instance:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Организация не найдена.",
            )

        if instance.owner_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Только владелец организации может обновить фотографию организации.",
            )

        photo_url = self.s3_service.upload_organization_profile_picture(
            organization_id=instance.id, file=file
        )
        instance.photo = photo_url
        self.session.commit()
        self.session.refresh(instance)

        return instance
