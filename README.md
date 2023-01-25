# Microprocessors Architecture Project
## by Balmus Sebastian

---

### Backend
- Install PostgreSQL https://www.postgresql.org/
- Start pgAdmin (the default master password is `postgres`)
- Create a database (use any name you want)
- In the backend directory, create a `.env` file that contains the following:
  - SECRET_KEY (use any hash value)
  - DB_NAME (use the name of the previously created database)
  - DB_USER (`postgres` by default)
  - DB_PASSWORD (`postgres` by default)
  - DB_HOST (on your machine, use `127.0.0.1`)
  - DB_PORT (it should be `5432`)
- Open the terminal and make sure that you are in the `backend` directory of the project
- Make sure that you have Python 3.10 installed on your machine
- Create a virtual environment (`python3 -m venv /path/to/new/virtual/environment`) and install the project's requirements (`pip install -r requirements.txt`)
- Apply the database changes by running `py manage.py migrate` in the terminal
- To start the back-end server, run `py manage.py runserver`

---

### Frontend
- Install Node.js LTS version on your machine https://nodejs.org/en/
- Open the terminal and make sure that you are in the `frontend` directory
- Run `npm install` to install the project's dependencies
- To start the application, run `npm start in the terminal`
