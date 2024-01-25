import os
from fastapi import HTTPException, status
from supabase import create_client, Client
from sqlalchemy.orm import Session

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)


class SupabaseService:
    def __init__(self, session: Session):
        self.session = session

    async def upload_image(self, bucket: str, path: str, file) -> str:
        try:
            file_content = file.read()
            supabase.storage.from_(bucket).upload(path, file_content, file_options={"content-type": "image/jpeg"})
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to upload file: {upload_response.error}")

        # Get the public URL
        public_url_response = supabase.storage.from_(bucket).get_public_url(path)
        if public_url_response:
            return public_url_response
        else:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to get public URL: {public_url_response.error}")
