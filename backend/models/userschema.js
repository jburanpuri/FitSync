const mongoose = require('mongoose')
const Schema = mongoose.Schema

var options = { discriminatorKey: 'userType', timestamps: true}

const userSchema = new Schema({
    email: { type: String, required: true},
    fname: { type: String, required: true},
    lname: { type: String, required: true},
}, options)

const User = mongoose.model('User', userSchema)
exports.User = User;

const clientSchema = new Schema({
    clientUniqueThing: {type: Number, required: false},
}, options)
const Client = User.discriminator('client', clientSchema)
exports.Client = Client;

const trainerSchema = new Schema({
    trainerUniqueThing: {type: Number, required: false},
}, options)
const Trainer = User.discriminator('trainer', trainerSchema)
exports.Trainer = Trainer;
//module.exports = User