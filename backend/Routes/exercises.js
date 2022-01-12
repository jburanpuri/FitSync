const router = require('express').Router();
let Exercise = require('../models/exerciseschema');

router.route('/').get((req,res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) =>{
    const exerciseName = req.body.exerciseName;

    const description = req.body.description;

    const tips = req.body.tips;

const newExercise = new Exercise({
    exerciseName,
    description,
    tips,
});

newExercise.save()
.then(() => res.json('Exercise added'))
.catch(err=> res.status(400).json('Error: ' + err));
});

module.exports = router;