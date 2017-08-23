const mongoose = require('mongoose');

const Post = require('../models/postModels');

const USER_STATUS_ERROR = 422;

const createPost = (req, res) => {
  const { title, content, author } = req.body;
  const newPost = new Post({ title, content, author });
  newPost.save((err, post) => {
    if (err) {
      res.status(422);
      res.json({ error: err.message });
      return;
    }
    res.json(post);
  })
};
const postList = (req, res) => {
  Post.find({})
    .exec((err, posts) => {
      if(err) {
        res.status(422);
        res.json({ error: err.message})
      }
      res.json(posts);
    })

}
const getPost = (req, res) => {
  const { id } = req.params;
    Post.findById(id)
    .populate('author', 'username')
    .exec((err, post) => {
      if (err) {
        res.status(422);
        res.json({ error: err.message });
        return;
      }
      res.json(post);
    });
}
const updatePost = (req, res) => {

}

module.exports = {
  createPost,
  postList,
  getPost,
  updatePost
}