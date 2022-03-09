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
.catch(err=> res.status(400).json(__dirname + 'Error: ' + err));
});

router.route('/exerciseSearch/:exerciseName').get((req, res) => {
    const exerciseName = req.params.exerciseName;
    console.log(req.body.exerciseName);
    Exercise.findOne({
        exerciseName: exerciseName
    })
    .then(exercise => {
        if(exercise == null) {
            res.send("That exercise doesn't exist!")
        }
        else {
            res.json(exercise)
        }
    })
    .catch(error => console.error(error))
})

module.exports = router;