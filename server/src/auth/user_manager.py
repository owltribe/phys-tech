import uuid
from typing import Optional

from fastapi import HTTPException, Request, status
from fastapi_users import (
    BaseUserManager,
    UUIDIDMixin,
    exceptions,
    models,
    schemas,
)

from config import AUTH_SECRET
from database import async_session_maker
from models.organization import Organization
from models.user import UserRole
from src.auth.schemas import UserRead, UserWithOrganizationCreate


class UserManager(UUIDIDMixin, BaseUserManager[UserWithOrganizationCreate, uuid.UUID]):
    reset_password_token_secret = AUTH_SECRET
    verification_token_secret = AUTH_SECRET

    async def create(
        self,
        user_create: schemas.UC,
        safe: bool = False,
        request: Optional[Request] = None,
    ) -> models.UP:
        """
        Create a user in database.

        Triggers the on_after_register handler on success.

        :param user_create: The UserCreate model to create.
        :param safe: If True, sensitive values like is_superuser or is_verified
        will be ignored during the creation, defaults to False.
        :param request: Optional FastAPI request that
        triggered the operation, defaults to None.
        :raises UserAlreadyExists: A user already exists with the same e-mail.
        :return: A new user.
        """
        await self.validate_password(user_create.password, user_create)

        existing_user = await self.user_db.get_by_email(user_create.email)
        if existing_user is not None:
            raise exceptions.UserAlreadyExists()

        user_dict = user_create.create_update_dict() if safe else user_create.create_update_dict_superuser()
        password = user_dict.pop("password")
        user_dict["hashed_password"] = self.password_helper.hash(password)

        organization_data = user_dict.pop("organization_data", None)
        created_user = await self.user_db.create(user_dict)

        await self.on_after_register(created_user, organization_data, request)

        return created_user

    async def on_after_register(
        self,
        user: UserRead,
        organization_data: Organization,
        request: Optional[Request] = None,
    ):
        if user.role == UserRole.ORGANIZATION:
            async with async_session_maker() as session:  # Using async session for DB operations
                try:
                    organization = Organization(**organization_data, owner_id=user.id)
                    session.add(organization)
                    await session.commit()
                    await session.refresh(organization)

                    # Update user with organization id
                    update_dict = {"organization_id": organization.id}
                    await self.user_db.update(user, update_dict)
                except:
                    raise HTTPException(
                        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                        detail="Ошибка при созданий организации",
                    )
                    # await session.rollback()

    # async def on_after_forgot_password(
    #     self, user: User, token: str, request: Optional[Request] = None
    # ):
    #     print(f"User {user.id} has forgot their password. Reset token: {token}")
    #
    # async def on_after_request_verify(
    #     self, user: User, token: str, request: Optional[Request] = None
    # ):
    #     print(f"Verification requested for user {user.id}. Verification token: {token}")
