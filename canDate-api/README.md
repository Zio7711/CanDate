## Local database Setup

1. on your vagrant machine and in candate api folder run:
   `psql -U vagrant -d template1`

2. Run the following SQL commands to create the necessary objects in the DB:
   `CREATE ROLE labber WITH LOGIN password 'labber';`
   `CREATE DATABASE candate OWNER labber;`

note: If you have created users and password before, so probably you don't need to run the first command. However, make sure you create candate database.

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information

- username: `labber`
- password: `labber`
- database: `candate`

3. Install dependencies: `npm i`

4. Reset database: `npm run db:reset`

- Check the db folder to see what gets created and seeded in the SDB

5. Run the server: `npm run local`

- Note: nodemon is used, so you should not have to restart your server

6. Visit `http://localhost:8080/api/users`

## Warnings & Tips

- Use the `npm run db:reset` command each time there is a change to the database schema or seeds.
  - It runs through each of the files, in order, and executes them against the database.
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
