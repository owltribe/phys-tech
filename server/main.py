import uuid

from fastapi import FastAPI, Depends
from fastapi_pagination import add_pagination
from fastapi_users import FastAPIUsers

from models.user import User
from src.auth.auth_backend import auth_backend
from src.auth.router import auth_router
from src.auth.utils import get_user_manager
from src.service.router import services_router
from src.event.router import events_router

app = FastAPI()

# Third party apps
add_pagination(app)

app.include_router(auth_router)
app.include_router(services_router)
app.include_router(events_router)

# Protected router example
fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)
current_active_user = fastapi_users.current_user(active=True)


@app.get("/protected-route")
def protected_route(user: User = Depends(current_active_user)):
    return f"Hello, {user.email}"

@app.get("/unprotected-route")
def protected_route():
    return {
        "data": f"Hello, World"
    }
