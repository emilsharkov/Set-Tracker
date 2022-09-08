const express = require("express")
const router = express.Router()
const pool = require('../database/database.js')

router.get("/:login", async (req, res) => {
    try {
        let loginReq = req.params.login
        loginReq = JSON.parse(decodeURIComponent(loginReq))
        
        const user = await pool.query(
            "SELECT * FROM \"user\" where email = $1 and password = $2",
            [loginReq.email, loginReq.password]
        )
        res.json(user.rows[0])

    } catch (err) {
        console.log(err.message)
    }
})

router.post("/", async (req, res) => {
    try {
        let newUserReq = req.body.newUser
        const newUser = await pool.query(
            "INSERT INTO \"user\" (first_name, last_name, email, username, password) VALUES ($1, $2, $3, $4, $5) returning *",
            [newUserReq.firstName, newUserReq.lastName, newUserReq.email, newUserReq.username, newUserReq.password]
        )
        res.json(newUser.rows[0])

    } catch (err) {
        console.log(err.message)
    }
})

router.put("/:id", async (req, res) => {
    try {
        let updatedUserReq = req.body.updatedUser
        let userID = req.params.id
        const updatedUser = await pool.query(
            "UPDATE \"user\" SET (first_name, last_name, email, username, password) = ($1, $2, $3, $4, $5) where user_id = $6 returning *",
            [updatedUserReq.firstName, updatedUserReq.lastName, updatedUserReq.email, updatedUserReq.username, updatedUserReq.password, userID]
        )
        res.json(updatedUser.rows[0])

    } catch (err) {
        console.log(err.message)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        let deleteIDReq = req.params.id
        const deletedUser = await pool.query(
            "DELETE FROM \"user\" WHERE user_id = $1 returning *",
            [deleteIDReq]
        )
        res.json(deletedUser.rows[0])

    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router;