-- Workout rest api queries

-- Get All
SELECT * FROM "workout" where user_id = 1;

-- Get 
SELECT * FROM "workout" where user_id = 1 and workout_id = 1;

-- Post
INSERT INTO "workout" (user_id, workout_details) VALUES (1, '{"exercises":[{"name":"Lat Pulldown","sets":[{"weight":200,"reps":10},{"weight":200,"reps":9},{"weight":200,"reps":8}]},{"name":"Lateral Raise","sets":[{"weight":40,"reps":10},{"weight":40,"reps":9},{"weight":40,"reps":8}]}]}') returning *;

-- Put
UPDATE "workout" SET (workout_details) = ('test') where workout_id = 2 returning *;

-- Delete
DELETE FROM "workout" where workout_id = 1 returning *;