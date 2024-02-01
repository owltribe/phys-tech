from fastapi import HTTPException, status, Depends

from models import User, UserRole
from src.auth.auth_backend import current_active_user


class PermissionChecker:

    def __init__(self, required_roles: list[UserRole]) -> None:
        self.required_roles = required_roles

    def __call__(self, user: User = Depends(current_active_user)) -> User:
        if user.role not in self.required_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Доступ запрещен",
            )

        return user
