# Traka

Traka is full stack PERN web application made to record workout data for bodybuilders. It uses Node.js as a runtime environment, Express.js on the server-side to run RESTful APIs, PostgreSQL as a database, and React.js written in TypeScript for the front-end. Additionally, Traka is containerized for scalability using Docker and deployed to an AWS EC2 instance.

## How to Run Traka on Your Machine:

### Option 1: Using Docker

#### Requirements

Step 1: Make sure you have Docker and git installed on your local machine

#### Installation

Step 2: Open a terminal and type ```git clone https://github.com/emilsharkov/Set-Tracker.git```

#### Usage

Step 3: Navigate inside the Traka folder, open a terminal, and type ```docker-compose up```

Step 4: Open a browser and type ```localhost:3000``` into the search bar and the application will be running

Step 5: To stop the application, open a new terminal and type ```docker-compose down```

### Option 2: Using Node.js and PostgreSQL

#### Requirements

Step 1: Make sure you have Node.js, PostgreSQL, and git installed on your local machine

Step 1.5: GNU Make is not a requirement, however, it makes running the application locally easier with the MakeFile

#### Installation

Step 2: Open a terminal and type ```git clone https://github.com/emilsharkov/Set-Tracker.git```

Step 3: Open two terminals and navigate to the cloned repository folder

Step 4: Navigate the first terminal into the client folder and run ```npm install```

Step 5: Navigate the second terminal into the server folder and run ```npm install```

Step 6: Open another terminal and run ```psql -U postgres``` and login

Step 7: Execute the first command in ```./server/database/db_create.sql```

Step 8: Navigate into the database by typing ```\c set_tracker```

Step 9: Execute the last two commands in ```./server/database/db_create.sql``` one by one

Step 10: Navigate to ./server/database/database.js and change the pool to 
```
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
