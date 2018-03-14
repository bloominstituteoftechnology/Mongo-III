const User = require('../models/userModels');

const userCreate = (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  newUser
    .save()
    .then(user => {
      res.status(201).json(user);
    })
    .catch(errorSavingUser => {
      res.status(500).json(errorSavingUser);
    });
};

const userLogin = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
      if (user.password === password) res.status(200).json(user);
      else throw new Error();
    })
    .catch(errGettingUser => res.status(500).json({ errGettingUser }));
};

module.exports = {
  userCreate,
  userLogin,
};
