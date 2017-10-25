const mongoose = require('mongoose');
const User = require('../models/userModels');

const STATUS_SERVER_ERROR = 500;
const STATUS_USER_ERROR = 422;
const STATUS_UNAUTHORIZED = 401;

const addUser = (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save((err, user) => {
    return err ? res.status(STATUS_SERVER_ERROR).json(err) : res.json(user);
  });
};

const checkUser = (req, res) => {
  const { username, password } = req.body;
  
  User.findOne({ username, password })
  .exec((err, found) => {
    if (err) return res.status(STATUS_SERVER_ERROR).json(err);
    if(found === null) return res.status(STATUS_UNAUTHORIZED).json({ ERROR: 'USER NOT FOUND'});
    res.json(found);
  });
};

module.exports = {
  addUser,
  checkUser
};