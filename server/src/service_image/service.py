from typing import Type

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from models import ServiceImage
from src.s3.service import S3Service


class ServiceImageService:
    def __init__(self, session: Session) -> None:
        self.session = session
        self.s3_service = S3Service()

    def retrieve(self, service_image_id: str) -> Type[ServiceImage]:
        instance = (
            self.session.query(ServiceImage)
            .filter(ServiceImage.id == service_image_id)
            .first()
        )

        if instance is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Изображение сервиса не найдено.",
            )

        return instance

    def destroy(self, service_image_id: str):
        instance = self.retrieve(service_image_id)

        is_deleted_from_storage = self.s3_service.delete_service_image(
            instance.service_id, instance.id
        )

        if instance and is_deleted_from_storage:
            self.session.delete(instance)
            self.session.commit()
        return None

    def list_by_service_id(self, service_id) -> list[Type[ServiceImage]]:
        return (
            self.session.query(ServiceImage)
            .filter(ServiceImage.service_id == service_id)
            .all()
        )
