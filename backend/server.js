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

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(bodyparser.json())

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

var to;
var subject;
var body;
var path

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./images");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).single("image"); //Field name and max count


app.post('/sendemail',(req,res) => {
    upload(req,res,function(err){
        if(err){
            console.log(err)
            return res.end("Something went wrong!");
        }else{
            to = req.body.to
            subject = req.body.subject
            body = req.body.subject
            path = req.file.path
            console.log(to)
            console.log(subject)
            console.log(body)
            console.log(req.file)
            console.log(req.files)
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'fitsyncsupp@gmail.com',
                  pass: 'fitsync123!'
                }
              });
              
              var mailOptions = {
                from: 'fitsyncsupp@gmail.com',
                to: to,
                subject:subject,
                text:body,
                attachments: [
                  {
                   path: path
                  }
               ]
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  fs.unlink(path,function(err){
                    if(err){
                        return res.end(err)
                    }else{
                        console.log("deleted")
                        return res.redirect('/result')
                    }
                  })
                }
              });
        }
    })
})

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
    console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});