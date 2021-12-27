const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config()

const app = express();
const hostname = "localhost";
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//connecting to database
const uri = process.env.ATLAS_URI
mongoose.connect(uri) //, {useNewUrlParser: true, useCreateIndex: true}
const connection = mongoose.connection;

//once connection open, log to console
connection.once('open', () => {
    console.log("FitSync database connection established successfully")
})

const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

app.listen(port, hostname, () => {
    console.log(`Server is running on port: ${port}`);
});