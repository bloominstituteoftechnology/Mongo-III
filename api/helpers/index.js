const Post = require('../models/post.js');

module.exports = {
  handleErr: (status, message, res) =>
    res.status(status).json({ Error: message }),

  loginErr: res =>
    res
      .status(422)
      .json({ Error: 'Please enter a valid username and password' }),

  getPost: async (id, res) => {
    const post = await Post.findById(id).populate('comments');
    if (!post) return handleErr(422, 'Invalid post ID', res);
    return post;
  }
};
