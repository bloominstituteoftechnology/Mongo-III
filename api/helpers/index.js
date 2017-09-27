const bcrypt = require('bcrypt');
const Post = require('../models/post.js');

module.exports = {
  hashPass: async password => await bcrypt.hash(password, 11),

  comparePass: async (password, hash) => await bcrypt.compare(password, hash),

  handleErr: (status, message, res) =>
    res.status(status).json({ Error: message }),

  loginErr: res =>
    res
      .status(422)
      .json({ Error: 'Please enter a valid username and password' }),

  getPost: async (id, res) => {
    const post = await Post.findById(id).populate('comments');
    return post ? post : handleErr(422, 'Invalid post ID', res);
  }
};
