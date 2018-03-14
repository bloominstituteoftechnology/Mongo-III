const express = require('express');
const Post = require('../models/postModels.js');
const postRouter = express.Router();

postRouter.post('/new-post', (req, res) => {
  const newPostInfo = req.body;
  const post = new Post(newPostInfo);
  post
    .save()
    .then(savedPost => {
      res.status(200).json(savedPost);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'The post could not be saved', error: err });
    });
});

module.exports = postRouter;
