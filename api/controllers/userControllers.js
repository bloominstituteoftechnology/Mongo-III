const express = require('express');
const User = require('../models/userModels.js');

const userRouter = express.Router();

userRouter.post('/new-user', (req, res) => {
  const userInfo = req.body;
  const user = new User(userInfo);
  user
    .save()
    .then(savedUser => {
      res.status(200).json(savedUser);
    })
    .catch(error => {
      res
        .status(500)
        .json({message: 'The user could not be created.', error: error});
    });
});

module.exports = userRouter;
