const express = require("express")
const router = express.Router()
const pool = require('../database/database.js')

router.get("/:login", async (req, res) => {
    try {
        let loginReq = JSON.parse(decodeURIComponent(req.params.login))
        const user = await pool.query(
            "SELECT user_id,first_name,last_name,email FROM \"user\" where email = $1 and password = $2",
            [loginReq.email, loginReq.password]
        )
        if(user.rows.length) {
            res.json(user.rows[0])
        } else {
            throw new Error('User Not Found')
        }
    } catch (err) {
        res.status(404).json(err.message)
    }
})

router.post("/", async (req, res) => {
    try {
        let newUserReq = req.body.newUser
        const newUser = await pool.query(
            "INSERT INTO \"user\" (first_name, last_name, email, username, password) VALUES ($1, $2, $3, $4, $5) returning user_id,first_name,last_name,email",
            [newUserReq.firstName, newUserReq.lastName, newUserReq.email, newUserReq.username, newUserReq.password]
        )
        if(newUser.rows.length) {
            res.json(newUser.rows[0])
        } else {
            throw new Error('User Not Found')
        }

    } catch (err) {
        res.status(404).json(err.message)
    }
})

router.put("/:id", async (req, res) => {
    try {
        let updatedUserReq = req.body.updatedUser
        let userID = req.params.id
        const updatedUser = await pool.query(
            "UPDATE \"user\" SET (first_name, last_name, email, username, password) = ($1, $2, $3, $4, $5) where user_id = $6 returning user_id,first_name,last_name,email",
            [updatedUserReq.firstName, updatedUserReq.lastName, updatedUserReq.email, updatedUserReq.username, updatedUserReq.password, userID]
        )

        if(updatedUser.rows.length) {
            res.json(updatedUser.rows[0])
        } else {
            throw new Error('User Not Found')
        }

    } catch (err) {
        res.status(404).json(err.message)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        let deleteIDReq = req.params.id
        const deletedUser = await pool.query(
            "DELETE FROM \"user\" WHERE user_id = $1 returning user_id,first_name,last_name,email",
            [deleteIDReq]
        )

        if(deletedUser.rows.length) {
            res.json(deletedUser.rows[0])
        } else {
            throw new Error('User Not Found')
        }

    } catch (err) {
        res.status(404).json(err.message)
    }
})

module.exports = router;