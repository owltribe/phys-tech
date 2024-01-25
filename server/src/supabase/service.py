import os
from supabase import create_client, Client
from sqlalchemy.orm import Session

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)


class SupabaseService:
    def __init__(self, session: Session):
        self.session = session

    async def upload_to_supabase(bucket: str, path: str, file):
        file_content = await file.read()
        supabase.storage.from_(bucket).upload(path, file_content, file_options={"content-type": "image/jpeg"})

    def get_public_url(bucket: str, path: str) -> str:
        response = supabase.storage.from_(bucket).get_public_url(path)
        if response.data:
            return response.data.get('publicURL')
        else:
            raise Exception(f"Failed to get public URL: {response.error}")
