###  Getting started:
  #### Running manually
  - Add .env file with given credentials  
  - Activate venv: `poetry shell`
  - Install dependencies: `pip install -r requirements.txt`
  - Run server: `uvicorn main:app --reload`

  #### Running using Docker
  - Add .env file with given credentials
  - `docker-compose -f docker-compose.dev.yml up --build`


---
 
### Migration generate:
  - `alembic revision --rev-id=<revisionId> --autogenerate -m 'your_message'`
  - Example: `alembic revision --rev-id=0001 --autogenerate -m 'your_message'`

###  Migration apply:
  - Specific version
    - `alembic upgrade <revisionId>`
    - `alembic downgrade <revisionId>` 
    - Example `alembic upgrade 6d4bb18b725c`
  - Latest version
    - `alembic upgrade head`

###  Unapply all migrations:
  - `alembic downgrade base`

###  To show all applied migrations:
  * `alembic history`

###  Setup environments:
  * create `.env` folder
  * see `.env-sample` for exact env variables 
  * if DB is not created make sure to create instance locally
  * example to create docker container
    * `docker run --name phys-tech-db -e POSTGRES_PASSWORD=mysecretpassword -d postgres`

### PhysTech Admin panel - Access:
  * [Click here for Admin Panel](http://78.40.216.114:8000/admin)
  * or copy this `http://78.40.216.114:8000/admin`
 
### PhysTech Admin - Navigation:
  * Users
    * View all current users
    * Export selected/all users
    * Add/Delete user
    * Search by email, first and last name

  * Organizations
    * View all current organizations
    * Export selected/all organizations
    * Add/Delete organizations
    * Search by email, first and last name

  * Services
    * View all current services
    * Export selected/all services
    * Add/Delete services
    * Search by email, first and last name

  * Service Requests
    * View all current service requests
    * Export selected/all service requests
    * Add/Delete service requests
    * Search by email, first and last name