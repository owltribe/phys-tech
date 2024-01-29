from fastapi import FastAPI, Depends
from fastapi_pagination import add_pagination
from sqladmin import Admin

from database import engine
from models.user import User
from src.auth.admin import UserAdmin, admin_authentication_backend
from src.auth.auth_backend import current_active_user
from src.auth.router import auth_router
from src.event.admin import EventAdmin
from src.organization.admin import OrganizationAdmin
from src.service.admin import ServiceAdmin
from src.service.router import services_router
from src.organization.router import organizations_router
from src.event.router import events_router
from src.service_request.admin import ServiceRequestAdmin
from src.service_request.router import service_request_router

app = FastAPI()

# Third party apps
add_pagination(app)
admin = Admin(
    app,
    engine,
    authentication_backend=admin_authentication_backend,
    title="PhysTech Admin"
)

# Admin
admin.add_view(UserAdmin)
admin.add_view(OrganizationAdmin)
admin.add_view(ServiceAdmin)
admin.add_view(ServiceRequestAdmin)
admin.add_view(EventAdmin)

# Routers
app.include_router(auth_router)
app.include_router(services_router)
app.include_router(organizations_router)
app.include_router(events_router)
app.include_router(service_request_router)


# Protected router example
@app.get("/protected-route")
def protected_route(user: User = Depends(current_active_user)):
    return f"Hello, {user.email}"


@app.get("/unprotected-route")
def protected_route():
    return {
        "data": f"Hello, World"
    }
