const mongoose = require('mongoose');
const Post = mongoose.model('Post');


const STATUS_USER_ERROR = 422;
const STATUS_OK = 200;

const checkUserError = (err, res) => {
  if (typeof err === 'string') {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Error' });
    return;
  }
  res.status(STATUS_USER_ERROR);
  res.json(err);
};

const createPost = (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    comments: req.body.comments,
  });
  newPost.save((err, post) => {
    if (err) {
      checkUserError(err, res);
      return;
    }
    res.status(STATUS_OK);
    res.json(post);
  })
};

const listPosts = (req, res) => {
  Post.find({})
  .exec((err, post) => {
    if (err) {
      checkUserError(err, res);
      return;
    }
    res.status(STATUS_OK);
    res.json(post);
  });
};

const findPost = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
  .exec((err, post) => {
    if (err) {
      checkUserError(err, res);
      return;
    }
    res.status(STATUS_OK);
    res.json(post);
  });
};

const updatePost = (req, res) => {
  const { id } = req.params;
  Post.findByIdAndUpdate(id, req.body)
  .exec((err, post) => {
    if (err) {
      checkUserError(err, res);
      return;
    }
    res.status(STATUS_OK);
    res.json(post);
  });
};

module.exports = {
  createPost,
  listPosts,
  findPost,
  updatePost
};
