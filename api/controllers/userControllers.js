const mongoose = require('mongoose');
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
  User.findOne({username}, (err1, foundUserName) => {
    if (err1 || !foundUserName) {
      res.status(STATUS_USER_ERROR).json({ error: "Could not find user ID" });
      return;
    }
    User.findOne({password}, (err2, foundPassword) => {
      if (err2 || !foundPassword) {
        res.status(STATUS_USER_ERROR).json({ error: "Could not find user password" });
        return;
      }
      res.json({ Login: "was successful!" });
    });
  });
}

module.exports = {
  createUser,
  findUser
};