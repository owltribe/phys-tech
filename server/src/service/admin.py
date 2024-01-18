from sqladmin import ModelView

from models import Service


class ServiceAdmin(ModelView, model=Service):
    column_list = [
        Service.id,
        Service.name,
        Service.expected_result,
        Service.created_at,
    ]
