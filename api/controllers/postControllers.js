const mongoose = require('mongoose');

const Post = require('../models/postModels');

const STATUS_USER_ERROR = 422;

const makeNewPost = (req, res) => {
  const { title, author, content, comments } = req.body;
  const newPost = new Post({ title, author, content, comments });
  newPost.save((err, post) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
      return;
    }
    res.json(post);
  });
}

const listPosts = (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
      return;
    }
    res.json(posts);
  });
}

const findSinglePost = (req, res) => {
  const { id } = req.params;
  console.log('ID from req.params ' + id);
  Post.findById(id)
  .populate('author', 'comments.userName')
  .exec()
    .then((post) => {
      console.log(post);
      res.json(post);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR);
      res.json({ stack: err.stack, message: err.message });
    });
}

const updatePost = (req, res) => {
  const { id } = req.params;
  Post.findOne

}

module.exports = {
  makeNewPost,
  listPosts,
  findSinglePost,
  updatePost,
}
