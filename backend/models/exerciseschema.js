const { default: BSON } = require('bson');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    //name: { type: String, required: true},
    //category: { type: String, required: true},
    animation: { data: Buffer, contentType: String},
},)

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;