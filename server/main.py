from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi_pagination import add_pagination
from sqladmin import Admin
from starlette.middleware.cors import CORSMiddleware

from config import ENVIRONMENT
from database import sync_engine
from src.auth.admin import UserAdmin, admin_authentication_backend
from src.auth.router import auth_router
from src.event.admin import EventAdmin
from src.event.router import events_router
from src.organization.admin import OrganizationAdmin
from src.organization.router import organizations_router
from src.service.admin import ServiceAdmin
from src.service.router import services_router
from src.service_image.admin import ServiceImageAdmin
from src.service_image.router import service_image_router
from src.service_request.admin import ServiceRequestAdmin
from src.service_request.router import service_request_router

app = FastAPI()

if ENVIRONMENT == "production":
    allow_origins = [
        "http://localhost:3000",
        "https://octopus-app-m6bno.ondigitalocean.app/services",
        "https://science.owltribe.dev",
        "*",
    ]
else:
    allow_origins = [
        "http://localhost:3000",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Third party apps
add_pagination(app)
admin = Admin(
    app=app,
    engine=sync_engine,
    authentication_backend=admin_authentication_backend,
    title="PhysTech Admin",
)
templates = Jinja2Templates(directory="templates")

# Admin
admin.add_view(UserAdmin)
admin.add_view(OrganizationAdmin)
admin.add_view(ServiceAdmin)
admin.add_view(ServiceImageAdmin)
admin.add_view(ServiceRequestAdmin)
admin.add_view(EventAdmin)

# Routers
app.include_router(auth_router)
app.include_router(services_router)
app.include_router(organizations_router)
app.include_router(events_router)
app.include_router(service_request_router)
app.include_router(service_image_router)


@app.get("/privacy-policy", response_class=HTMLResponse)
def privacy_policy(request: Request):
    return templates.TemplateResponse(
        name="privacy-policy.html", context={"request": request}
    )


@app.get("/terms-and-conditions", response_class=HTMLResponse)
async def terms_and_conditions(request: Request):
    return templates.TemplateResponse(
        name="terms-and-conditions.html", context={"request": request}
    )
