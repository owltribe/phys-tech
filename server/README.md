* Getting started: 
  - Activate env: `poetry shell`
  - Install dependencies: `poetry install`
  - Run server: `uvicorn main:app --reload`

* Migration generate:
  - `alembic revision --rev-id=<revisionId> --autogenerate -m 'your_message'`
  - Example: `alembic revision --rev-id=0001 --autogenerate -m 'your_message'`

* Migration apply:
  - Specific version
    - `alembic upgrade <revisionId>`
    - Example `alembic upgrade 6d4bb18b725c`
  - Latest version
    - `alembic upgrade head`

* Unapply all migrations
  - `alembic downgrade base`

* To show all applied migrations
  * `alembic history`