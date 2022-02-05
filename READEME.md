RATE THIS JOB - README
1. Clone this repo. https://github.com/171cas/Rate-This-Job
2. Install dependencies at frontend & backend directories.
O
pm install
3. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL.
O
CREATE USER <name> WITH CREATED PASSWORD «'password'>
4. Create a .env file in the backend directory based on the .env.example found within the respective directory.
5. Enter your username and password information into your .env file along with your desired database name, a
secured combination of characters for your JWT_SECRET, an expiration time for JWT_EXPIRES_IN and your desired PORT (preferably 5000).
6. Add the following proxy to your package.json file within your frontend directory, replacing or keeping the 5000
e
port to match your PORT configuration found in your .env file.
O
"proxy": "http://localhost:5000"
7. Create Database, Migrate, and Seed models.
O
npx dotenv sequelize db: create
O
npx dotenv sequelize db:migrate
O
npx dotenv sequelize db:seed:all
8. Start the services in the backend directory.
O
nom start
9. Start the services in the frontend directory, which should open the project in your default browser. If not,
navigate to http://localhost:3000.
O
nom start
