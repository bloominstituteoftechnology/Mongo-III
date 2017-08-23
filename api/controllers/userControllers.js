const mongoose = require('mongoose');

const User = require('../models/userModels');

const STATUS_USER_ERROR = 422;

const saveSingleUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  newUser.save((err, user) => {
    if(err) {
      res.status(STATUS_USER_ERROR);
      res.json(err); 
      return;
    }
    res.json(user);
  });
}

const userLogin = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password }, (err, user) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json({ 'username or password is incorrect': err });
      return;
    }
    res.json(user);
  });
}

module.exports = {
  saveSingleUser,
  userLogin,
}