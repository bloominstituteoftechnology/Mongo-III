const bcrypt = require('bcrypt');

const Post = require('../models/post');

module.exports = {
  catchErrors: fn => (req, res, next) => fn(req, res, next).catch(next),

  notFound: (req, res, next) => {
    const err = new Error('🚫 Not Found');
    err.status = 404;
    next(err);
  },

  validationErrors: (err, req, res, next) => {
    if (!err.errors) return next(err);
    res.status(err.status || 422).json({ Error: `🚫 ${err.message}` });
  },

  dHandleErrors: (err, req, res, next) => {
    err.stack = err.stack || '';
    const errorDetails = {
      status: err.status,
      message: err.message,
      stack: err.stack
    };
    res.status(err.status || 500).json(errorDetails);
  },

  pHandleErrors: (err, req, res, next) => {
    res.status(err.status || 500).json({ Error: `🚫 ${err.message}` });
  },

  handleErr: (status, message, res) =>
    res.status(status).json({ Error: `🚫 ${message}` }),

  loginErr: res =>
    res
      .status(422)
      .json({ Error: 'Please enter a valid username and password' }),

  hashPass: async password => await bcrypt.hash(password, 11),

  comparePass: async (password, hash) => await bcrypt.compare(password, hash)
};
