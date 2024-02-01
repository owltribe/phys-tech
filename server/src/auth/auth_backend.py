import uuid

from fastapi_users import FastAPIUsers
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    JWTStrategy,
)

from config import AUTH_SECRET
from models import User
from src.auth.utils import get_user_manager

bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")


def get_jwt_strategy() -> JWTStrategy:
    # lifetime_seconds is 12 hours
    return JWTStrategy(secret=AUTH_SECRET, lifetime_seconds=60 * 60 * 12)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)

fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)
current_active_user = fastapi_users.current_user(active=True)
