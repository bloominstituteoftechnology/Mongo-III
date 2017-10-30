const User = require('../models/userModels');
const { errorHandler } = require('../util');

const addUser = (req, res) => {
  const { username, password } = req.body;
  if (username == false) {
    return errorHandler({
      error: 'Missing arguments',
      required: ['username', 'password']
    }, req, res);
  }
  new User({ name: username, password }).save()
    .then((user) => res.send(user))
    .catch((error) => errorHandler(error, req, res, 'UserSaveError'));
};

const authenticateUser = (req, res) => {
  const { username, password } = req.body;
  if (username == false || password == false) {
    return errorHandler({
      error: 'Missing arguments',
      required: ['username', 'password']
    }, req, res);
  }
  User.findOne({ name: username, password })
    .then((user) => {
      if (user) {
        return res.send(user)
      }
      errorHandler({}, req, res, 'UserNullError');
    })
    .catch((error) => errorHandler(error, req, res, 'UserFindError'))
};

module.exports = { addUser, authenticateUser };
