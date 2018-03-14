const mongoose = require("mongoose");
const userModel = require("./models/userModels");

const createUser = (req, res) => {
  const { userName, passWord } = req.body;
  const newUser = new userModel({ userName, passWord });
  newUser
    .save()
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "Not able to create new user" });
    });
};

const loginUser = (req, res) => {
  const { userName, passWord } = req.body;
  newUser
    .findOne(userName, passWord)
    .exec()
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "Not able to login user" });
    });
};

module.exports = {
  createUser,
  loginUser
};
