from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from database import get_db
from models import User, UserRole
from src.auth.auth_backend import current_active_user
from src.auth.rbac import rbac
from src.service_image.service import ServiceImageService

service_image_router = APIRouter(prefix="/service-images", tags=["Services"])
service = ServiceImageService


@service_image_router.delete(
    "/{service_image_id}",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
)
@rbac(
    roles=[UserRole.ORGANIZATION],
    error_message="Удалять изображения могут только организации.",
)
def destroy(
    service_image_id: str,
    current_user: User = Depends(current_active_user),
    session: Session = Depends(get_db),
):
    return service(session).destroy(service_image_id)
