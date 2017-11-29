const Users = require('../models/userModels');
const mongoose = require('mongoose');

module.exports = {
  create: (req, res) => {
    const { username, password } = req.body;
    const user  = new Users({ username, password });
    user.save(err => err ? res.status(422).json({ error: err }) : res.json(user));
  },
  find: (req, res) => {
    const { username, password } = req.body;
    Users.findOne({ username, password }, (err, user) => err ? res.status(422).json({ error: err }) : res.json(user));
  }
}