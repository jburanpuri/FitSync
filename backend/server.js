const express = require('express');
const cors = require('cors');
const app = express();

//run on port 3000
app.listen(3000, () => console.log("Server is up"))
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/routes/register', (req, res) => {
    console.log(req.body)
    res.json({ status: ok })
})

//routes
const exercises = require('./routes/exercises');
const users = require('./routes/users');

app.use('/exercises', exercises);
app.use('/users', users);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});