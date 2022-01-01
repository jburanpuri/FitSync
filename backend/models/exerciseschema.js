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
        required: true,
        default: false
    }
});
module.exports = exercise = mongoose.model('exercise', exerciseSchema);