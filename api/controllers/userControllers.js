const mongoose = require('mongoose');

require("../models/postModels.js");
require("../models/userModels.js");

const Post = mongoose.model('Post');
const User = mongoose.model('User');

const STATUS_USER_ERROR = 422;

const newUser = (req, res) => {
  const { username, password } = req.body;
  console.log({ username, password })
  const user = new User({ username, password });
  user.save()
    .then((usery) => {
      res.json(usery);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR);
      res.json(err);
    });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;
  User.find({ username, password })
    .exec()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res
        .status(STATUS_USER_ERROR)
        .json(err);
    })
};

module.exports = {
  newUser,
  loginUser
};