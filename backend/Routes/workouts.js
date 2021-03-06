const router = require('express').Router()
var Workout = require('../models/workoutschema')

//get list of all workouts
router.route('/').get((req, res) => {
    Workout.find()
    .then(workouts => res.json(workouts))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/workoutSearch/:uid').get((req, res) => {
    const uid = req.params.uid;
    console.log(req.body.uid);
    Workout.findOne({
        uid : uid
    })
    .then(workout => {
        if(workout == null) {
            res.send("That workout doesn't exist!")
        }
        else {
            res.json(workout)
        }
    })
    .catch(error => console.error(error))
})

//add a new workout
router.route('/addWorkout').post((req, res) => {
    const workoutName = req.body.workoutName;
    const exercises = req.body.exercises;
    const uid = req.body.uid;
    console.log(workoutName)
    console.log(exercises)
    Workout.findOne({
        workoutName: workoutName
    })
    .then(result => {
        if(result == null) { //no workout with that name yet
            let newWorkout = new Workout({workoutName, exercises, uid});
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