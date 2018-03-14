const User = require('../models/userModels');

function newUser(req, res) {
  const user = new User(req.body);
  user.save()
    .then(newdude => {
      res.status(201).json(newdude);
    })
    .catch(err => {
      res.status(400).json({ errorMessage: err }).end();
    });
}

// function validateUser() {

// }

module.exports = newUser;
