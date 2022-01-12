const router = require('express').Router()
var Workout = require('../models/workoutschema')

//get list of all workouts
router.route('/').get((req, res) => {
    Workout.find()
    .then(workouts => res.json(workouts))
    .catch(err => res.status(400).json('Error: ' + err))
})

//add a new workout
router.route('/addWorkout').post((req, res) => {
    const workoutName = req.body.workoutName;
    const exercises = req.body.exercises;
    Workout.findOne({
        workoutName: workoutName
    })
    .then(result => {
        if(result == null) { //no workout with that name yet
            let newWorkout = new Workout({workoutName, exercises});
            newWorkout.save()
            .then(() => res.json('Workout added'))
            .catch(err => res.status(400).json('Error: ' + err))
         }
        else res.send("Workout name already used")
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

//delete a workout
router.route('/deleteWorkout').delete((req, res) => {
    const workoutName = req.body.workoutName;
    Workout.findOne({
        workoutName: workoutName
    })
    .then(result => {
        if(result == null) { //no workout with that name
            res.send("Invalid!")
        }
        else {
            const deletedWorkout = Workout.deleteOne(result)
            res.send("Workout deleted successfully!")
        }
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;