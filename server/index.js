const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/User')
const workoutRoute = require('./routes/Workout')
const pool = require('./database/database.js')

const app = express()

//middleware
app.use(cors())
app.use(express.json())

//routes
app.use('/user', userRoute)
app.use('/workout', workoutRoute)

app.listen(5000, () => {
    console.log('server has started on port 5000')
})