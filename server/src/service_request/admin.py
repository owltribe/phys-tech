from sqladmin import ModelView

from models import ServiceRequest


class ServiceRequestAdmin(ModelView, model=ServiceRequest):
    column_list = [
        ServiceRequest.id,
        ServiceRequest.status,
        "service_request.service.name",
        ServiceRequest.requested_by,
        ServiceRequest.created_at,
    ]
