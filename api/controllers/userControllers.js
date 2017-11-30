const mongoose = require('mongoose');

const Post = require('../models/post');
const User = require('../models/user');
const statusCodes = require('../../common/statusCodes.js');
const { log, catchLog } = require('../../common/console.js');

const STATUS_USER_ERROR = 422;
const STATUS_CREATED = 201;
/* eslint-disable no-console */
const login = (req, res) => {
  const { username, password } = req.body;
  console.log(`username: ${username} password: ${password}`);
  User.findOne({ username, password })
    .exec()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      catchLog('err:', err.message);
      res
        .status(statusCodes.serverError)
        .json(`User Not found error: ${err.message}`);
    });
};
const createUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  newUser
    .save()
    .then((createdUser) => {
      res.status(STATUS_CREATED).json(createdUser);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR).json({ error: err.message });
    });
};

module.exports = {
  login,
  createUser
};
