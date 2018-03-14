const express = require('express');
const User = require('../models/userModels.js');

const userRouter = express.Router();

userRouter.post('/new-user', (req, res) => {
  const userInfo = req.body;
  const user = new User(userInfo);
  user
    .save()
    .then(savedUser => {
      res.status(200).json(savedUser);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'The user could not be created.', error: err });
    });
});

userRouter.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      message: 'Please provide a username and password',
      error: err,
    });
  }
  User.find({ username: username, password: password })
    .then(foundUser => {
      if (foundUser.length === 0) {
        res.status(500).json({
          message: 'The user could not be found',
        });
      }
      res.status(200).json(foundUser);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'The user could not be found', error: err });
    });
});

module.exports = userRouter;
