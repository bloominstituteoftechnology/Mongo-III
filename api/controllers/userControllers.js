const mongoose = require('mongoose');

const Post = require('../models/postModels');
const User = require('../models/userModels');

const createUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });

  newUser
    .save()
    .then((createdUser) => {
        res.json(createdUser);
    })
    .catch((err) => {
        res
          .status(422)
          .json({ error: err.message });
        return;
    });
};

module.exports = {
    createUser,
    userLogin
};
