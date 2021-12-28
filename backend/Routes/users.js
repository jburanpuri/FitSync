const router = require('express').Router()
var user = require('../models/userschema')

//gets list of all users
router.route('/').get((req, res) => {
    user.User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
});

//gets list of all clients
router.route('/clients').get((req, res) => {
    user.Client.find()
    .then(clients => res.json(clients))
    .catch(err => res.status(400).json('Error: ' + err))
});

//signup as a new client or trainer
router.route('/signup').post((req, res) => {
    const email = req.body.email;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const type = req.body.type;

    user.User.findOne({
        email: email
    })
    .then(result => {
        if(result == null) { //first time user
            let newUser;
            if(type == 'client') {
                newUser = new user.Client({email, fname, lname})
            }
            else if(type == 'trainer') {
                newUser = new user.Trainer({email, fname, lname})
            }
            newUser.save()
            .then(() => res.json('User added!'))
            .catch(err => res.status(400).json('Error: ' + err))
        }
        else res.send("Email already used") //if email already taken
    })
    .catch(error => console.error(error))
})

//gets list of all trainers
router.route('/trainers').get((req, res) => {
    user.Trainer.find()
    .then(trainers => res.json(trainers))
    .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;