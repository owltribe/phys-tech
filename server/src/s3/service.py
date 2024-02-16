import boto3
from fastapi import File, HTTPException, UploadFile, status

from config import (
    S3_ACCESS_KEY_ID,
    S3_ENDPOINT_URL,
    S3_REGION_NAME,
    S3_SECRET_ACCESS_KEY,
)


class S3Service:
    def __init__(self):
        self.ENDPOINT_URL = S3_ENDPOINT_URL
        self.REGION_NAME = S3_REGION_NAME
        self.AWS_ACCESS_KEY_ID = S3_ACCESS_KEY_ID
        self.AWS_SECRET_ACCESS_KEY = S3_SECRET_ACCESS_KEY

        self.session = boto3.session.Session()
        self.client = self.session.client(
            "s3",
            endpoint_url=self.ENDPOINT_URL,
            region_name="fra1",
            aws_access_key_id=self.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=self.AWS_SECRET_ACCESS_KEY,
        )

    def __put_object(
        self, bucket_name: str, key: str, file: UploadFile = File(...)
    ):
        try:
            response = self.client.put_object(
                ACL="public-read",
                Body=file.file,
                Bucket=bucket_name,
                Key=key,
            )
            url = f"{self.ENDPOINT_URL}/{bucket_name}/{key}".replace(" ", "+")

            return response, url

        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=str(e),
            )

    def upload_organization_profile_picture(
        self, organization_id: str, file: UploadFile = File(...)
    ):
        bucket_name = "organization-profile-picture"
        key = f"{organization_id}.png"

        response, url = self.__put_object(bucket_name, key, file)

        if response["ResponseMetadata"]["HTTPStatusCode"] == 200:
            return url
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Ошибка загрузки изображения в хранилище.",
            )

    def upload_user_avatar(self, user_id: str, file: UploadFile = File(...)):
        bucket_name = "user-profile-picture"
        key = f"{user_id}.png"
        response, url = self.__put_object(bucket_name, key, file)

        if response["ResponseMetadata"]["HTTPStatusCode"] == 200:
            return url
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Ошибка загрузки изображения в хранилище.",
            )

    def upload_service_image(
        self,
        service_id: str,
        service_image_id: str,
        file: UploadFile = File(...),
    ):
        bucket_name = "service-image"
        key = f"{service_id}/{service_image_id}.png"
        response, url = self.__put_object(bucket_name, key, file)

        if response["ResponseMetadata"]["HTTPStatusCode"] == 200:
            return url
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Ошибка загрузки изображения в хранилище.",
            )
