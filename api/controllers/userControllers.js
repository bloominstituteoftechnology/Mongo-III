const mongoose = require("mongoose");
const User = require("../models/userModels");

const addUser = (req, res) => {
  const userInfo = req.body;

  if (!userInfo.username || !userInfo.password) {
    res.status(400).json({
      errorMessage: "Please enter a username and password.",
    });
  }

  const newUser = new User(userInfo);
  newUser.save().then(newUser => {
    res
      .status(200)
      .json(newUser)
      .catch(err => {
        if (userInfo.unique === false) {
          res.status(400).json({
            errorMessage: "Oops, that username is already taken.",
          });
        }
        res.status(500).json({
          error: "Error creating new user",
        });
      });
  });
};

const userLogin = (req, res) => {
  const userInfo = req.body;

  if (!userInfo.username || !userInfo.password) {
    res.status(400).json({
      errorMessage: "Please provide a username and password.",
    });
  }

  User.findOne(userInfo)
    .then(user => {
      if (user) {
        return res.send(user);
      }
      res.status(400).json({ errorMessage: "Oops, could not find user." });
    })
    .catch(err => {
      res.status(500).json({ error: "Error logging in" });
    });
};

module.exports = { addUser, userLogin };
