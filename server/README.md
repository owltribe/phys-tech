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

* Setup environments
  * create `.env` folder
  * see `.env-sample` for exact env variables 
  * if DB is not created make sure to create instance locally
  * example to create docker container
    * `docker run --name phys-tech-db -e POSTGRES_PASSWORD=mysecretpassword -d postgres`

