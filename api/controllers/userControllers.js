const mongoose = require('mongoose');

const User = mongoose.model('../models/userModels');

const STATUS_USER_ERROR = 422;

const createUser = (req, res) => {
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
const listUsers = (req, res) => {
    
}
const findUser = (req, res) => {

}
const deleteUser = (req, res) => {

}


module.exports = {
    createUser,
    /* listUsers,
    findUser,
    deleteUser */
};
