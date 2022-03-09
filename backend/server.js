require("dotenv").config({ path: "./config.env" });
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const errorHandler = require("./middleware/error");
const conversationRoute = require("./Routes/conversations");
const messageRoute = require("./Routes/messages");

connectDB();

app.use(cors());
app.use(express.json());

const exercisesRouter = require('./Routes/exercises')
const workoutsRouter = require('./Routes/workouts')
//routes


app.get("/", (req, res, next) => {
    res.send("Api running");
});

app.use('/exercises', exercisesRouter)
app.use('/workouts', workoutsRouter)
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);

app.use('/api/auth', require('./routes/auth'));
app.use("/api/private", require("./routes/private"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
    console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});