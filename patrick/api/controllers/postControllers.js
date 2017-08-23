const mongoose = require('mongoose');
const Post = require('../models/postModels');

const STATUS_USER_ERROR = 422;

const createPost = (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({ title, content });
  // newPost.save((err, post) => {
  //   if (err) {
  //     res.status(STATUS_USER_ERROR);
  //     res.json(err);
  //     return;
  //   }
  //   res.json(post);
  // });
  newPost.save()
    .then((newPost) => {
        res.json(newPost);
    })
    .catch((err) => {
        res.status(STATUS_USER_ERROR);
        res.json({ stack: err.stack, message: err.message });
    });
}

// const listPosts = (req, res) => {
//   //
// };
//
// const updatePost = (req, res) => {
//   //
// };
//
// const deletePost = (req, res) => {
//   //
// };

module.exports = {
  createPost,
  // listPosts,
  // updatePost,
  // deletePost,
}
