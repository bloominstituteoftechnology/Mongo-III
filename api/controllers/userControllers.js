const mongoose = require('mongoose');

const User = require('../models/userModels.js');

const createUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });

  newUser
    .save()
    .then(nUser => res.json(nUser))
    .catch(err => res.status(422).json(err));
};

const login = (req, res) => {
  const { username, password } = req.body;
  User
    .findOne({ username, password })
    .select('username')
    .exec()
    .then(fUser => res.json(fUser))
    .catch(err => res.status(422).json(err));
};

module.exports = {
  createUser,
  login,
};
