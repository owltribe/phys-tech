"""event

Revision ID: 0004
Revises: 0003
Create Date: 2024-01-16 19:26:37.573804

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0004'
down_revision: Union[str, None] = '0003'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('event',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('start_date', sa.Date(), nullable=False),
    sa.Column('start_time', sa.Time(), nullable=False),
    sa.Column('duration', sa.Integer(), nullable=False),
    sa.Column('location', sa.String(), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(), nullable=True),
    sa.Column('updated_at', sa.TIMESTAMP(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('event')
    # ### end Alembic commands ###