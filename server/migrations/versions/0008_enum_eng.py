"""enum_eng

Revision ID: 0008
Revises: 0007
Create Date: 2024-01-30 18:29:39.289252

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0008'
down_revision: Union[str, None] = '0007'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


import sqlalchemy as sa
from alembic import op

def upgrade():
    # Rename the old types temporarily
    op.execute("ALTER TYPE category RENAME TO category_old")
    op.execute("ALTER TYPE servicerequeststatus RENAME TO servicerequeststatus_old")

    # Create new types
    new_category_type = sa.Enum('Scientific Organization', 'University', 'Technopark', 'Commercial laboratory company', name='category')
    new_service_request_status_type = sa.Enum('Pending', 'Approved', 'Rejected', 'Completed', name='servicerequeststatus')

    new_category_type.create(op.get_bind(), checkfirst=False)
    new_service_request_status_type.create(op.get_bind(), checkfirst=False)

    # Update columns to use the new types
    op.execute("ALTER TABLE organization ALTER COLUMN category TYPE category USING category::text::category")
    op.execute("ALTER TABLE service_request ALTER COLUMN status TYPE servicerequeststatus USING status::text::servicerequeststatus")

    # Drop the old types
    op.execute("DROP TYPE category_old")
    op.execute("DROP TYPE servicerequeststatus_old")

def downgrade():
    # Rename the new types temporarily
    op.execute("ALTER TYPE category RENAME TO category_new")
    op.execute("ALTER TYPE servicerequeststatus RENAME TO servicerequeststatus_new")

    # Recreate the old types
    old_category_type = sa.Enum('Научная организация', 'Вуз', 'Технопарк', 'Коммерческая Лабораторная компания', name='category')
    old_service_request_status_type = sa.Enum('Ожидается', 'Утверждено', 'Отклонено', 'Завершено', name='servicerequeststatus')

    old_category_type.create(op.get_bind(), checkfirst=False)
    old_service_request_status_type.create(op.get_bind(), checkfirst=False)

    # Update columns to use the old types
    op.execute("ALTER TABLE organization ALTER COLUMN category TYPE category USING category::text::category")
    op.execute("ALTER TABLE service_request ALTER COLUMN status TYPE servicerequeststatus USING status::text::servicerequeststatus")

    # Drop the new types
    op.execute("DROP TYPE category_new")
    op.execute("DROP TYPE servicerequeststatus_new")
