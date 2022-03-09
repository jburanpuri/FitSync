require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const fs = require('fs')
const multer = require('multer')
const app = express();
const bodyparser = require("body-parser");
const nodemailer = require('nodemailer')
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const socket = require("socket.io");


app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

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

//removed
/*
app.use('/api/auth', require('./routes/auth'));
app.use("/api/private", require("./routes/private"));*/

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.use("/api/calendar", require("./controllers/CalendarController"));


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
    console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
