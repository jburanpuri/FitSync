require("dotenv").config({ path: "/config.env" });
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});