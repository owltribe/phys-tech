from sqladmin import ModelView

from models import Organization


class OrganizationAdmin(ModelView, model=Organization):
    column_list = [
        Organization.id,
        Organization.name,
        Organization.email,
        Organization.category,
    ]
    column_searchable_list = [
        Organization.name,
        Organization.email,
    ]
