const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('../models/userModels');

const STATUS_USER_ERROR = 422;

const createUser = (req, res) => {
  const { username, password } = req.body;
  const  newUser = new User({ username, password });
  newUser.save((err, user) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
    } else {
      res.json(user);
    }
  });
};

const findUser = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .where({ password: { $eq: password } })
    .exec((err, user) => {
      if (err) {
        res.status(STATUS_USER_ERROR);
        res.json(err);
      } else {
        res.json(user);
      }
    });
};

module.exports = {
  createUser,
  findUser
};