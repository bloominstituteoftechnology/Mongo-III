const mongoose = require('mongoose');

const Post = require('../models/postModels');

const USER_STATUS_ERROR = 422;

const createPost = (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({ title, content });
  newPost.save()
      .then((newPost) => {
          res.json(newPost);
      })
      .catch((err) => {
          res.status(STATUS_USER_ERROR);
          res.json({ stack: err.stack, message: err.message });
      });
};
const postList = (req, res) => {

}
const getPost = (req, res) => {
  
}
const updatePost = (req, res) => {

}

module.exports = {
  createPost,
  postList,
  getPost,
  updatePost
}