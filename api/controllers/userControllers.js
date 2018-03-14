const User = require('../models/userModels');

function newUser(body) {
  const { userName, password } = body;
  const user = new User(userName, password); 
  return user.save()
  .then(newdude => {
    res.status(201).json(newdude);
  })
  .catch(err => {
    res.status(400).json({ errorMessage: err }).end();
  });
}

// function validateUser() {

// }

module.exports = { newUser };