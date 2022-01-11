require("dotenv").config({ path: "./config.env" });
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const app = express();
const errorHandler = require("./middleware/error");

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res, next) => {
    res.send("Api running");
});

//routes
app.use('/api/auth', require('./routes/auth'));
app.use("/api/private", require("./routes/private"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`)
    server.close(() => process.exit(1));
})