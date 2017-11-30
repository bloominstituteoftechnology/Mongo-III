const mongoose = require('mongoose');

const User = require('../models/userModels');

const STATUS_USER_ERROR = 422;

const createUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  newUser.save((err, createdUser) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
      return;
    }
    res.json(createdUser);
  });
};

const getUser = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password })
    .exec()
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.send(err);
      return;
    });
};

module.exports = {
  createUser,
  getUser
};