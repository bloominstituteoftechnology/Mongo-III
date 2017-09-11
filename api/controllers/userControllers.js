const mongoose = require('mongoose');

const User = mongoose.model('User');

const createUser = (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    newUser.save()
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                res.status(422).json(err);
            })
}

const getUser = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username, password })
        .exec()
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.status(422).json(err);
        })
}

module.exports = {
    createUser,
    getUser
};