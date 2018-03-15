const express = require('express');
const mongoose = require('mongoose');

const STATUS_SUCCESS = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

const User = require('../models/userModels.js');

const newUser = (res, req) => {
  const userInfo = req.body;

  const {
    username,
    password
  } = req.body;

  const user = new user(req.body);

  if (!username || !password) {
    console.log(error);
    res.status(STATUS_USER_ERROR).json({ errorMessage: "Please provide both username and password for the user." });
  } else {
    user
      .save()
      .then(savedUser => {
        res.status(STATUS_SUCCESS).json(savedUser);
      })
      .catch(error => {
        console.log(error);
        res.status(STATUS_SERVER_ERROR).json({ error: "There was an error while saving the user to the Database" });    
      });
  }
};

const userLogin = (res, req) => {
  const userInfo = req.body;

  const {
    username,
    password
  } = req.body;

  if (!username || !password) {
    console.log(error);
    res.status(STATUS_USER_ERROR).json({ errorMessage: "Please provide both username and password for the user." });
  } else {
    User.findOne(userInfo)
      .exec()
      .then(existingUser => {
        res.status(STATUS_SUCCESS).json(existingUser);
      })
      .catch(error => {
        console.log(error);
        res.status(STATUS_SERVER_ERROR).json({ error: "There was an error while retrieving the user from the Database" });    
      });
  }
};

module.exports = {
  newUser,
  userLogin
};