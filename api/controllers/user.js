const mongoose = require('mongoose');
const { handleErr, loginErr } = require('../helpers');

const User = require('../models/user');

module.exports = {
  // TODO: auth? hash password?
  newUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      const newUser = new User({ username, password });
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
      if (user.password !== password) return loginErr(res);
      res.status(200).json(user);
    } catch (err) {
      handleErr(500, err.message, res);
    }
  }
};
