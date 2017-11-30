const mongoose = require('mongoose');

const User = require('../models/userModels');

const STATUS_USER_ERROR = 422;

const createUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  newUser
    .save()
    .then((createdUser) => {
      res.status(200).json(createdUser);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR).json({ errorMessage: err.message });
      return;
    });
};


const loginUser = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password })
  .select('username')
  .exec()
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    res.status(STATUS_USER_ERROR).json({ errorMessage: err.message });
    return;
  });
};


module.exports = {
  createUser,
  loginUser
};