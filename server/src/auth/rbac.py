from functools import wraps
from typing import Optional

from fastapi import HTTPException, status

from models import User, UserRole


def rbac(
    roles: list[UserRole], error_message: Optional[str] = "Доступ запрещен"
):
    def decorator_permission(func):
        @wraps(func)
        async def wrapper_permission(*args, **kwargs):
            user: User = kwargs.get("current_user")
            if user.role not in roles:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=error_message,
                )

            return await func(*args, **kwargs)

        return wrapper_permission

    return decorator_permission
