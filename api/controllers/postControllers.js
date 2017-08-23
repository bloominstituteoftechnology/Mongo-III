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
  Post.findById(id)
  .populate('author', 'username')
  .exec((err, post) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json({ stack: err.stack, message: err.message });
      return;
    }
      res.json(post);
  });
}

const addComment = (req, res) => {
  const { id } = req.params;
  const { text, author } = req.query;
  const newComment = { text, author };
  Post.findById(id, (err, post) => {
    post.comments.push(newComment)
    post.save((error, blogPost) => {
      Post.findById(blogPost._id)
      .populate('comments.author', 'username')
      .exec((postErr, myPost) => {
        if (postErr) {
          res.status(STATUS_USER_ERROR);
          res.json(postErr)
          return;
        }
        res.json(myPost);
      })
    })
  });
}

module.exports = {
  makeNewPost,
  listPosts,
  findSinglePost,
  addComment,
}
