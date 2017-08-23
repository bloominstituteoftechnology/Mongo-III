const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Post = require('../models/postModels');

const STATUS_USER_ERROR = 422;

const createPost = (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post ({ title, content });
  newPost.save((err, post) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
    } else {
      res.json(post);
    }
  });
};



module.exports = {
  createPost,
  listPosts
};