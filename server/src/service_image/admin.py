from sqladmin import ModelView

from models import ServiceImage


class ServiceImageAdmin(ModelView, model=ServiceImage):
    column_list = [
        ServiceImage.id,
        ServiceImage.url,
        ServiceImage.service,
        ServiceImage.created_at,
    ]
