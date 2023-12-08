* Getting started: 
  - Activate env: `poetry shell`
  - Install dependencies: `poetry install`
  - Run server: `uvicorn main:app --reload`

* Migration generate:
  - `alembic revision --autogenerate -m "your_message"` 
  - Example `alembic revision --autogenerate -m "0001"`

* Migration apply:
  - Specific version
    - `alembic upgrade {revision}`
    - Example `alembic upgrade 6d4bb18b725c`
  - Latest version
    - `alembic upgrade head`