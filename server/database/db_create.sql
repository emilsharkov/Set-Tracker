CREATE DATABASE set_tracker;

CREATE TABLE "user"(
    user_id SERIAL Primary KEY,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    email VARCHAR (255) UNIQUE NOT NULL,
    username VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL
);

CREATE TABLE "workout"(
    workout_id SERIAL PRIMARY KEY,
    user_id integer REFERENCES "user"(user_id),
    workout_details VARCHAR (1000) NOT NULL
);

