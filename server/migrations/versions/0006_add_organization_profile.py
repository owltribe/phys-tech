"""add_organization_profile

Revision ID: 0006
Revises: 0005
Create Date: 2024-01-22 20:14:02.532409

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0006'
down_revision: Union[str, None] = '0005'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('organization', sa.Column('owner_id', sa.UUID(), nullable=True))
    op.create_foreign_key('fk_organization_owner', 'organization', 'user', ['owner_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('fk_organization_owner', 'organization', type_='foreignkey')
    op.drop_column('organization', 'owner_id')
    # ### end Alembic commands ###