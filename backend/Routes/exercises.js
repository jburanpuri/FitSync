const router = require('express').Router()
var Exercise = require('../models/exerciseschema')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const BSON = require('bson');
const Long = BSON.Long;

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.filename + '-' + Date.now())
    }
})
var upload = multer({ storage: storage})

//get list of all exercises
router.route('/').get((req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/addExercise', upload.single('video')).post((req, res) => {
    //const name = req.body.name;
    //const category = req.body.category;

    const newExercise = Exercise({
        //name: name,
        //category: category,
        animation: {
            data: fs.readFileSync(path.join(__dirname + '../../../animations/Lunge.mp4')),
            contentType: 'video/mp4'
        }
    })
    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;