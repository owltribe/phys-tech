from fastapi_filter.contrib.sqlalchemy import Filter

from models import Service


class ServiceFilter(Filter):
    class Constants(Filter.Constants):
        model = Service
        search_field_name = "custom_name_for_search"
        search_model_fields = ["name", "description", "result"]
