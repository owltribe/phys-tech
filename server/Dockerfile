FROM python:3.11

WORKDIR /app
COPY pyproject.toml poetry.lock /app/

# Install Poetry
RUN pip install poetry

# Install dependencies
RUN poetry config virtualenvs.create false && poetry install --no-dev

# Copy the rest of the application code
COPY . /app

EXPOSE 8000

CMD ["uvicorn", "main:app"]

