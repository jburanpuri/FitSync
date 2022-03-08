const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    exerciseName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tips: {
        type: String,
        required: false,
        default: ""
    },
});
module.exports = exercise = mongoose.model('exercise', exerciseSchema);