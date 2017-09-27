const User = require('./userModel');

const userNew = async user => new User(user)
  .save();

const userGetById = async id => User
  .findById(id);

const userFindOne = async q => User
  .findOne(q);

module.exports = {
  userNew,
  userFindOne
};