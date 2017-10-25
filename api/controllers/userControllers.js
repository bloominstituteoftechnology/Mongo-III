const mongoose = require('mongoose');

const User = mongoose.model('User');
const Post = mongoose.model('Post');

const STATUS_USER_ERROR = 422;

const postNewUser = (req, res) => {
    const { username, password } = req.query;
    const newUser = new User({ username, password });
    newUser.save()
        .then((newUser) => {
            res.json(newUser);
        })
        .catch((err) => {
            res.status(STATUS_USER_ERROR);
            res.json({ stack: err.stack, message: err.message });
        });
};

const findNewUser = (req, res) => {
    const { username, password } = req.query;
    const newUser = { username, password };
    User.findOne({ newUser }).exec()
        .then((newUser) => {
            res.json(newUser);
        })
        .catch((err) => {
            res.status(STATUS_USER_ERROR);
            res.json({ stack: err.stack, message: err.message });
        });
};
