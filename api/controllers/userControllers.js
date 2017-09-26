const User = require("../models/userModels");
const utils = require("../utils")();

module.exports = () => {
  return {
    create: (req, res) => {
      const { username, password } = req.body;
      const newUser = new User({ username, password });
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => utils.errHandler(500, "Error creating an account for this user.", res));
    },
    auth: (req, res) => {
      const { username, password } = req.body;
      User.findOne({ username })
        .exec()
        .then(user => {
          console.log(user, username, password);
          if (user.password !== password) return utils.errHandler(403, "Incorrect username and password combination.", res);
          return user ? res.json(user) : utils.errHandler(404, "Sorry this user does not exist in our system.", res);
        })
        .catch(err => utils.errHandler(500,"Server error attempting to login. Please try again later.", res));
    }
  };
};
