const mongoose = require('mongoose');
const { hashPass, comparePass, handleErr, loginErr } = require('../helpers');
const User = require('../models/user');

module.exports = {
  newUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      const hashed = await hashPass(password);
      const newUser = new User({ username, password: hashed });
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (err) {
      handleErr(500, err.message, res);
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return loginErr(res);
    try {
      const user = await User.findOne({ username });
      if (!user) return loginErr(res);
      const compared = await comparePass(password, user.password);
      return compared ? res.status(200).json(user) : loginErr(res);
    } catch (err) {
      handleErr(500, err.message, res);
    }
  }
};
