import uuid

from fastapi import APIRouter, Depends, status, HTTPException
from fastapi_users import FastAPIUsers
from models.service import Service
from src.service.schemas import SerivceCreate

from sqlalchemy import insert
from database import get_async_session
from sqlalchemy.ext.asyncio import AsyncSession

services_router = APIRouter(
    prefix="/services",
    tags=["Services"]
)

@services_router.get(
    "/{id}",
    status_code=status.HTTP_200_OK,
)
async def get_service_by_id(id: uuid.UUID, session: AsyncSession = Depends(get_async_session)):
   return id

@services_router.post(
    "/create",
    status_code=status.HTTP_200_OK,
)
async def create_new_service(new_service: SerivceCreate, session: AsyncSession = Depends(get_async_session)):
    stmt = insert(Service).values(**new_service.dict())
    await session.execute(stmt)
    await session.commit()
    return {"status": "success"}