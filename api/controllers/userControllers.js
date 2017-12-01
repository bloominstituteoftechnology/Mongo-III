const User = require('../models/userModels');

const createUser = (req, res) => {
  const {username, password} = req.body;
  const newUser = {username, password};
  const user = new User(newUser)
  user.save((err, createdUser) => {
    if (err) {
      res.status(422);
      res.send({'Error inserting newUser into users: ': err.message});
      return;
    }
    res.json(createdUser);
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  const userLogin = { username, password };
  User.findOne(userLogin, (err, user) => {
    if (err) {
      res.status(422);
      res.send({'Error user not in database: ': err.message});
      return;
    }
    res.json(user);
  });
};

module.exports = {
  createUser,
  login,
};