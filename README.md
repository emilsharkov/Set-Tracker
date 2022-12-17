# Traka

Traka is full stack PERN web application made to record workout data for bodybuilders. It uses Node.js as a runtime environment, Express.js on the server-side to run RESTful APIs, PostgreSQL as a database, and React.js written in TypeScript for the front-end.

## Requirements

Step 1: Make sure you have Node.js, PostgreSQL, and git installed on your local machine

Step 1.5: GNU Make is not a requirement, however, it makes running the application locally easier with the MakeFile

## Installation

Step 2: Open a terminal and type ```git clone https://github.com/emilsharkov/Set-Tracker.git```

Step 3: Open two terminals and navigate to the cloned repository folder

Step 4: Navigate the first terminal into the client folder and run ```npm install```

Step 5: Navigate the second terminal into the server folder and run ```npm install```

Step 6: Open another terminal and run ```psql -U postgres``` and login

Step 7: Execute the first command in ```./server/database/db_create.sql```

Step 8: Navigate into the database by typing ```\c set_tracker```

Step 9: Execute the last two commands in ```./server/database/db_create.sql``` one by one

## Usage

Step 10: To run the application open two terminals, one for the client and one for the server and run ```npm start``` in both

Step 10.5: If you have GNU Make on your local machine you can run the Makefile by typing ```make``` in the base directory to run both the client and server 

## Constributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
