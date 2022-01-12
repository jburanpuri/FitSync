const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    workoutName: {type: String},
    exercises: [{
        name: String,
        sets: Number,
        repetitions: Number,
    }],
},)

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;