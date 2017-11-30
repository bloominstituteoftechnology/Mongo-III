const mongoose = require('mongoose');

const Post = require('../models/postModels');

const STATUS_USER_ERROR = 422;

const createPost = (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({ title, content });
  newPost
    .save()
    .then((createdPost) => {
      res.json(createdPost);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR).json(err);
      return;
    });
};
const getPosts = (req, res) => {
  const { title } = req.body;
  Post.find({}/*, "title"*/)
    .exec()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR).json(err);
      return;
    });
};
const findPost = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .exec()
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR).json(err);
    }); 
};
const updatePost = (req, res) => {
  const { id } = req.params;
  const { comments } = req.body;
  Post.findByIdAndUpdate(id, { comments }, { new: true }) 
    .exec()
    .then((updatedPost) => {
      res.json(updatedPost);
    })
    .catch((err2) => {
      res.status(STATUS_USER_ERROR).json(err2);
    })
}
module.exports = {
  createPost,
  getPosts,
  findPost,
  updatePost
}