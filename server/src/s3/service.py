import boto3
from botocore.exceptions import ClientError
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

        self.SERVICE_IMAGE_BUCKET = "service-image"

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

        except ClientError as e:
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
        bucket_name = "user-avatar"
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
        key = f"{service_id}/{service_image_id}.png"
        response, url = self.__put_object(self.SERVICE_IMAGE_BUCKET, key, file)

        if response["ResponseMetadata"]["HTTPStatusCode"] == 200:
            return url
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Ошибка загрузки изображения в хранилище.",
            )

    def delete_service_image(self, service_id: str, service_image_id: str):
        key = f"{service_id}/{service_image_id}.png"

        response = self.client.delete_object(
            Bucket=self.SERVICE_IMAGE_BUCKET, Key=key
        )

        if response["ResponseMetadata"]["HTTPStatusCode"] == 204:
            return True
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Ошибка удаления изображения услуги.",
            )

    def delete_service_folder(self, service_id: str):
        key = f"{service_id}/"

        response = self.client.delete_object(
            Bucket=self.SERVICE_IMAGE_BUCKET, Key=key
        )

        if response["ResponseMetadata"]["HTTPStatusCode"] == 204:
            return True
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Ошибка удаления папки услуги.",
            )

    # def delete_service_images(self, service_id: str):
    #     prefix = f"{service_id}/"
    #
    #     # response = self.client.list_objects(
    #     #     Bucket=self.SERVICE_IMAGE_BUCKET,
    #     #     Prefix=prefix,
    #     # )
    #
    #     response = (
    #         self.client.object_versions(
    #             Bucket=self.SERVICE_IMAGE_BUCKET,
    #         )
    #         .filter(Prefix=prefix)
    #         .delete()
    #     )
    #     print(response, "0=0-=0=0=-00=-0=-0")
    #
    #     if "Contents" not in response:
    #         return True
    #
    #     if "Contents" in response:
    #         objects_to_delete = [
    #             {"Key": obj["Key"]} for obj in response["Contents"]
    #         ]
    #         response = self.client.delete_objects(
    #             Bucket=self.SERVICE_IMAGE_BUCKET,
    #             Delete={"Objects": objects_to_delete},
    #         )
    #         if response["ResponseMetadata"]["HTTPStatusCode"] == 200:
    #             return True
    #         else:
    #             raise HTTPException(
    #                 status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
    #                 detail="Ошибка удаления изображений услуги.",
    #             )
