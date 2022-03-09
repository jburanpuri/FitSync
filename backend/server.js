require("dotenv").config({ path: "./config.env" });
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs')
const multer = require('multer')
const app = express();
const errorHandler = require("./middleware/error");
const bodyparser = require("body-parser");
const nodemailer = require('nodemailer')

connectDB();

app.use(cors());
app.use(express.json());

//test

const exercisesRouter = require('./routes/exercises')
const workoutsRouter = require('./routes/workouts')
//routes

app.use('/exercises', exercisesRouter)
app.use('/workouts', workoutsRouter)


app.get("/", (req, res, next) => {
    res.send("Api running");
});

app.use('/api/auth', require('./routes/auth'));
app.use("/api/private", require("./routes/private"));

app.use("/api/calendar", require("./Controllers/CalendarController"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
    console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});