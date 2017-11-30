const mongoose = require('mongoose');
const User = require("../models/userModel");

const STATUS_USER_ERROR = 422;

const createUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  newUser.save()
    .then((user) => {
      res.json(user)
    })
    .catch((error) => {
      res.status(STATUS_USER_ERROR).json({ error });
    });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password })
    .exec()
    .then((user) => {
      res.json(user)
    })
    .catch((error) => {
      res.status(STATUS_USER_ERROR).json({ error });
    });    
};

module.exports = {
  createUser,
  loginUser
};