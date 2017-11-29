const mongoose = require('mongoose');

const Post = require('../models/postModels.js');

const createPost = (req, res) => {
  const { author, title, content } = req.body;
  const newPost = new Post({ author, title, content });
  newPost
    .save()
    .then(nPost => res.json(nPost))
    .catch(err => res.status(422).json(err));
};

const listPosts = (req, res) => {
  Post
    .find({})
    .populate([
      { path: 'author', select: 'username' },
      { path: 'comments', select: 'text' },
    ])
    .exec()
    .then(posts => res.json(posts))
    .catch(err => res.status(500).json(err));
};

module.exports = {
  createPost,
  listPosts,
};
