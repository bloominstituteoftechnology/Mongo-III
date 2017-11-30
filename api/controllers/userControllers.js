const mongoose = require('mongoose');

const Post = require('../models/postModels');
const User = require('../models/userModels');

const STATUS_USER_ERROR = 422;

const createUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
    
  newUser
    .save()
    .then((createdUser) => {
        res.json(createdUser);
    })
    .catch((err) => {
        res.status(STATUS_USER_ERROR).json({ errorMessage: err.message });
        return;
    });
};

const userLogin = (req, res) => {
  const { username, password } = req.body;
  
  User.findOne({ username, password })
    .select('username')
    .exec()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR).json({ error: err.message });
    });
};

module.exports = {
    createUser,
    userLogin
};