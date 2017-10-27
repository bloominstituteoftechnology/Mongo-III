const User = require('../models/userModels.js');

const STATUS_USER_ERROR = 422;

const createUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  newUser
    .save()
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.send(err);
      return;
    });
};

const login = (req, res) => {
  const { username, password } = req.body;
  const userToLogin = { username, password };
  User.findOne(userToLogin)
    .exec()
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.send(err);
      return;
    });
};

module.exports = {
  createUser,
  login
};
