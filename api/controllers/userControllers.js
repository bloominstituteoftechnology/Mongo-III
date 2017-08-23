const mongoose = require('mongoose');

const User = require('../models/userModels');
const Post = require('../models/postModels');

const success = true;
const failure = false;
const SERVER_USER_ERROR = 422;

// this is a helper function to send errors
const sendUserError = (err, res) => {
  res.status(SERVER_USER_ERROR);
  if (typeof err === 'string') {
    res.json({ error: err });
    return;
  }
  res.json(err);
}

// helper function to show all users, does not work in UI use postman
const showUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(SERVER_USER_ERROR);
      res.json(err);
      return;
    }
    res.json(users);
  });
};

// create a new user and save in database
const createUser = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    sendUserError('Please provide a username and password');
    return;
  }
  const user = new User({ username, password });
  user.save((err) => {
    if (err) {
      sendUserError(err, res);
      return;
    }
    res.json({user});
  })
};

// this enables user auth so the user can sign in
const userLogin = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    sendUserError('Please provide a username and password', res);
    return;
  }
  User.findOne({ username, password}, (err, user) => {
    if (err) {
      sendUserError(err, res);
      return
    } else if (!user) {
      sendUserError('The user does not exist', res);
      return;
    }
    res.json(user);
  });
};

module.exports = {
  showUsers,
  createUser,
  userLogin,
}
