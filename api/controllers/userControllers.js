const mongoose = require('mongoose');

const User = require('../models/userModels');

const STATUS_USER_ERROR = 422;

const createUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  newUser.save((err, createdUser) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
      return;
    }
    res.json(createdUser);
  });
};

const findUser = (req, res) => {
  const { username, password } = req.body;
  //instructor code below
  //User.findOne({ username, password })
    //.select('username')
    //.exec()
    //.then((user) => {
      //res.json(user);
    //})
    //.catch(err => res.status(422).json({ error: err.messaage }))
  
  User.findOne({ username, password }, (err, username, password) => {
    if (err || !username || !password) {
      res.status(422);
      res.json({ message: 'Incorrect credentials!' });
    }
  })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(422);
      res.json({ errorMessage: err.message });
    });
};



module.exports = {
  createUser,
  findUser,
};