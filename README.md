# Traka

## Demo

![](https://github.com/emilsharkov/Traka/blob/main/TrakaDemo.gif)

## Overview

Traka is full stack PERN web application made to record workout data for bodybuilders. It uses Node.js as a runtime environment, React.js written in TypeScript for the front-end, Express.js on the server-side, and PostgreSQL as a database. Additionally, Traka is containerized for scalability using Docker and deployed to AWS ECS for hosting.

## You can access Traka online at:

http://trakaworkouts.com (Link is Deprecated Due to AWS Costs :))

## How to Run Traka on Your Machine:

### Option 1: Using Docker

#### Requirements

Step 1: Make sure you have Docker and git installed on your local machine

#### Installation

Step 2: Open a terminal and type ```git clone https://github.com/emilsharkov/Traka.git```

#### Usage

Step 3: Navigate inside the Traka folder, open a terminal, and type ```docker-compose build```

Step 4: Once it is finished building, in the same terminal type ```docker-compose up```

Step 5: To run the application, open a browser and type ```localhost``` into the search bar

Step 6: To stop the application, open a new terminal and type ```docker-compose down```

### Option 2: Using Node.js and PostgreSQL

#### Requirements

Step 1: Make sure you have Node.js, PostgreSQL, and git installed on your local machine

Step 1.5: GNU Make is not a requirement, however, it makes running the application locally easier with the MakeFile

#### Installation

Step 2: Open a terminal and type ```git clone https://github.com/emilsharkov/Traka.git```

Step 3: Open two terminals and navigate to the cloned repository folder

Step 4: Navigate the first terminal into the client folder and run ```npm install --legacy-peer-deps```

Step 5: Navigate the second terminal into the server folder and run ```npm install```

Step 6: Open another terminal and run ```psql -U postgres``` and login

Step 7: Execute the first command in ```./server/database/db_create.sql``` to create the database

Step 8: Navigate into the database by typing ```\c set_tracker```

Step 9: Execute the last two commands in ```./server/database/db_create.sql``` one by one to create the tables

Step 10: Navigate to ```./server/database/database.js``` and change the file to 
```
const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    password: *your postgres password*,
    host: "localhost",
    port: 5432,
    database: "set_tracker"
})
```
#### Usage

Step 11: To run the application open two terminals, one for the client and one for the server and run ```npm start``` in both

Step 11.5: If you have GNU Make on your local machine you can run the Makefile by typing ```make``` in the base directory to run both the client and server 

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
