from sqladmin import ModelView
from models import Event


class EventAdmin(ModelView, model=Event):
    column_list = [
        Event.id,
        Event.name,
        Event.start_date,
        Event.start_time,
    ]
    column_searchable_list = [
        Event.name,
        Event.description,
        Event.location,
    ]
    column_sortable_list = [
        Event.created_at,
        Event.start_date,
        Event.start_time,
        Event.duration,
    ]
