const express = require("express")
const router = express.Router()
const pool = require('../database/database.js')

router.get("/:userID", async (req, res) => {
    try {
        let userIDReq = req.params.userID
        const workouts = await pool.query(
            "SELECT * FROM \"workout\" where user_id = $1",
            [userIDReq]
        )
        res.json(workouts.rows)

    } catch (err) {
        console.log(err.message)
    }
})

router.get("/:userID/:workoutID", async (req, res) => {
    try {
        let userIDReq = req.params.userID
        let workoutIDReq = req.params.workoutID
        const workout = await pool.query(
            "SELECT * FROM \"workout\" where user_id = $1 and workout_id = $2",
            [userIDReq, workoutIDReq]
        )
        res.json(workout.rows[0])

    } catch (err) {
        console.log(err.message)
    }
})

router.post("/:userID/", async (req, res) => {
    try {
        let userIDReq = req.params.userID
        let newWorkoutReq = req.body.newWorkout
        console.log(newWorkoutReq)
        const newWorkout = await pool.query(
            "INSERT INTO \"workout\" (user_id, workout_details) VALUES ($1, $2) returning *",
            [userIDReq, newWorkoutReq]
        )
        res.json(newWorkout.rows[0])

    } catch (err) {
        console.log(err.message)
    }
})

router.put("/:userID/:workoutID", async (req, res) => {
    try {
        let workoutIDReq = req.params.workoutID
        let updatedWorkoutReq = req.body.updatedWorkout
        console.log(updatedWorkoutReq)
        const updatedWorkout = await pool.query(
            "UPDATE \"workout\" SET workout_details = $1 WHERE workout_id = $2 returning *",
            [updatedWorkoutReq, workoutIDReq]
        )
        res.json(updatedWorkout.rows[0])

    } catch (err) {
        console.log(err.message)
    }
})

router.delete("/:userID/:workoutID", async (req, res) => {
    try {
        let userIDReq = req.params.userID
        let workoutIDReq = req.params.workoutID
        const workouts = await pool.query(
            "DELETE FROM \"workout\" where user_id = $1 and workout_id = $2 returning *",
            [userIDReq, workoutIDReq]
        )
        res.json(workouts.rows[0])

    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router;