FROM python:3.12

WORKDIR /app
COPY pyproject.toml poetry.lock /app/

# Install Poetry
RUN pip install poetry

# Install dependencies
RUN poetry config virtualenvs.create false && poetry install --no-dev

# Copy the rest of the application code
COPY . /app

CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]

# Migrations apply
#CMD ["poetry", "run", "alembic", "upgrade", "head"]

