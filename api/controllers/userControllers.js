// const mongoose = require('mongoose');
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
      res.status(STATUS_USER_ERROR).json(err);
      return;
    });
};
const findUser = (req, res) => {
  const { username, password } = req.body;
  User.findOne({username, password})
    .select('username')
    .exec()
    .then((user) => {
      if (user === null) {
        res.status(422).json({error: err.message})
      }
      res.json(user);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR).json(err);
      return;
    });
};

module.exports = {
  createUser,
  findUser
};