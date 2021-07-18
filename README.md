# Candate 

Candate is a dating webapp to connect you with the most compatible singles using interest, age, location, and preferred gender filters. 

CanDate finds potential matches by personalizing the user's home page to show profiles based on the user's unique preferences and interests. At sign up, the user selects his or her interests and personal information, for CanDate to find user profiles that are most compatible with the user. Each profile is given a _match percentage_ to indicate how well their profiles match. 

## Technologies:
This project was built using the PERN stack (PostgreSQL, Express, React, NodeJS) with Material-UI library, React Bootstrap library, and Socket.io. 
For a full list of dependencies, please view the dependencies section.  

## Table of Contents
-   [Features with screenshots](#features-with-screenshots)
    - [Sign up](#sign-up-and-select-interest-tags)
    - [View Matches](#view-your-most-relevant-matches)
    - [Match Percentage](#most-compatible-matches)
    - [Filter](#further-filtering)
    - [Favorite and block users](#favorite-and-block)
    - [Message users](#message-other-users)
  - [Installation](#installation)
  - [Dependencies](#Dependencies)

## Features with Screenshots
### **Sign up and select interest tags**: 
Users are asked to select tags associated with their interests, so CanDate can show their most compatible profiles. 
<img src="https://media.giphy.com/media/81i2wIYUyrlBedZAXJ/giphy.gif" width="600" height="340">

### **View your most relevant matches**: 
Users will see their most relevant profiles, based on their location, age, gender, and interest preferences, as soon as they login. 
<img src="https://media.giphy.com/media/ICSgiRE0ZDt2OkSHni/giphy.gif" width="600" height="340">

### **Most compatible matches**: 
Each profile has a match percentage that indicates how well the profile's interests matches that of the user's. 
<img src="https://media.giphy.com/media/khiFo2cHswGyw58Jn7/giphy.gif" width="600" height="340">

### **Further filtering**: 
Not happy with your current results? The filter feature allows you to add, remove, or clear filters to update your profiles.

<img src="https://media.giphy.com/media/mbydEUNnvzFg90mrv8/giphy.gif" width="600" height="340">

### **Favorite and Block**: 
Favorite a profile to view in the _Favorite toggle_ or block a profile, so you'll never see them in your results again. 
<img src="https://media.giphy.com/media/I9UTYh5KOEniIHdQs8/giphy.gif" width="600" height="340">
<img src="https://media.giphy.com/media/X4idF8l9zmopL1AxzM/giphy.gif" width="600" height="340">

### **Message other users**: 
Initiate and receive conversations from other users with our message feature. 
<img src="https://media.giphy.com/media/annlemoZVyZCdZUnwv/giphy.gif" width="600" height="340">

## Installation
You should have two terminals open to set up local database and start the react app. 

### Local database setup

1. on your vagrant machine and in candate api folder run:
   `psql -U vagrant -d template1`

2. Run the following SQL commands to create the necessary objects in the DB:
   `CREATE ROLE labber WITH LOGIN password 'labber';`
   `CREATE DATABASE candate OWNER labber;`

3. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
4. Update the .env file with your correct local information

- username: `labber`
- password: `labber`
- database: `candate`

5. Install dependencies: `npm i`

6. Reset database: `npm run db:reset`

- Check the db folder to see what gets created and seeded in the SDB

7. Run the server: `npm run local`

- Note: nodemon is used, so you should not have to restart your server

### Start React App
1. In the project directory, run `npm start` to open up the app in development mode. The command should automatically open up http://localhost:3000 to view in the browser. 


## Dependencies

### Backend:
- Node 10.x or above
- Npm 5.x or above
- PG 6.x
- Express 4.17 or above
- Socket.io 2.4 or above

### Frontend: 
- React 17.0 or above
- React-dom 17.0 or above
- React-router-dom 5.2 or above
- React-bootstrap 1.6.1 or above
- Socket.io-client 4.1.2 or above
- Timeago-react 3.0.2 or above
- Web-vitals 1.1.2 or above
- Material-UI library 4.11 or above
- Bcryptjs 2.4.3 or above
- Axios 0.21.1 or above
- Framer-motion 4.1.17 or above
- Node-sass 4.14 or above
