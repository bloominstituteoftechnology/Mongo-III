const mongoose = require('mongoose');

const User = require('../models/userModels');

const STATUS_USER_ERROR = 422;

const createUser = (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    newUser.save()
        .then((newUser) => {
        res.json(newUser)
        })
        .catch((err) => {
            res.status(422);
            res.json({ error: err })
    });
};
const userLogin = (req, res) => {
    const { username, password } = req.body;
    User.findOne({$and: [{ username }, { password }]})
        .exec()
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.status(422);
            res.json({ error: err })
        });
};


module.exports = {
    createUser,
    userLogin
};
