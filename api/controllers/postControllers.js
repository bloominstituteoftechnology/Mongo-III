const mongoose = require('mongoose');

const { Post, Comment } = require('../models/postModels.js');

const STATUS_USER_ERROR = 422;

const createPost = (req, res) => {
  const { author, title, content } = req.body;
  const newPost = new Post({ author, title, content });
  newPost
    .save()
    .then((createdPost) => {
      res.status(200).json(createdPost);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR).json({ errorMessage: err.message });
      return;
    });
};

const getPosts = (req, res) => {
  Post.find({})
    .select('title _id')
    .exec()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR).json({ err });
      return;
    });
}

const getPost = (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(STATUS_USER_ERROR).json({ err: 'bad id' });
    return;
  }
  Post.findById(id)
    .populate('author')
    .exec()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR).json({ err });
      return;
    });
}

const addComment = (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(STATUS_USER_ERROR).json({ err: 'bad id' });
    return;
  }
  const { text, author } = req.body;
  const newComment = new Comment({ author, text });
  newComment.save().then(() => {
    Post.findByIdAndUpdate(id, { $push: { comments: newComment } })
      .exec()
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((err) => {
        res.status(STATUS_USER_ERROR).json({ err });
        return;
      });
    }
  ).catch(err => res.status(STATUS_USER_ERROR).json(err));
}

module.exports = {
  createPost,
  getPosts,
  getPost,
  addComment
};