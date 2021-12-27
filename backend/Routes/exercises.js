const router = require('express').Router()
var Exercise = require('../models/exerciseschema')

//get list of all exercises
router.route('/').get((req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;