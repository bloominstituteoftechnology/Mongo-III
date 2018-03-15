const User = require('../models/userModels');

function newUser(req, res) {
  const newUser = new User(req.body);
  newUser.save()
    .then(newDude => res.status(201).json(newDude))
    .catch(err => res.status(422).json(err).end());
}

function validateUser(req, res) {
  const { username, password } = req.body;
  User.findOne({ username, password }) // findOne can take an object, so now it checks for both username and password in documents
    .exec() // executes the query!
    .then(validUser => validUser 
      ? res.status(200).json(validUser) 
      : res.status(422).json({ error: 'User not found.' }).end()) // ternary to determine if valid user has been found.
    .catch(err => res.status(500).json(err).end())
}

module.exports = { newUser, validateUser };
