from functools import wraps
from typing import Optional

from fastapi import Depends, HTTPException, status

from models import User, UserRole
from src.auth.auth_backend import current_active_user


def rbac(
    roles: list[UserRole], error_message: Optional[str] = "Доступ запрещен"
):
    def decorator_permission(func):
        @wraps(func)
        def wrapper_permission(
            current_user: User = Depends(current_active_user, use_cache=False),
            *args,
            **kwargs,
        ):
            if (
                not hasattr(current_user, "role")
                or current_user.role not in roles
            ):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=error_message,
                )

            return func(*args, **kwargs)

        return wrapper_permission

    return decorator_permission
