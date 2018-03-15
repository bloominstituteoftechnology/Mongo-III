const mongoose = require('mongoose');
const User = require('../models/userModels');

const newUser = (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user
    .save()
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: 'There was an error!' });
    });
};

const login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password })
    .then(user => {
      if (!user || !password) {
        res.status(404).json({ message: 'Invalid login attempt!' });
      } else {
        if (user.password === password) {
          res.status(200).json(user);
        }
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'There was an error!' });
    });
};

module.exports = {
  newUser,
  login
};