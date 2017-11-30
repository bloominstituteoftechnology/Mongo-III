const mongoose = require('mongoose');
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

const STATUS_USER_ERROR = 422;

const createPost = (req, res) => {
  const { title, content, author } = req.body;
  const newPost = new Post({ title, content, author });
  newPost.save()
    .then((post) => {
      res.json(post)
    })
    .catch((error) => {
      res.status(STATUS_USER_ERROR).json({ error });
    });
};

const getPosts = (req, res) => {
  Post.find()
  .exec() 
  .then((posts) => {
    res.json(posts)
  })
  .catch((error) => {
    res.status(STATUS_USER_ERROR).json({ error });
  });
};

const getPost = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
  .populate('author', 'username')
  .populate({
    path: 'comments',
    populate: { path: 'author', select: 'username' }
  })
  .exec()
  .then((post) => {
    res.json(post)
  })
  .catch((error) => {
    res.status(STATUS_USER_ERROR).json({ error });
  });
};

const updatePost = (req, res) => {
  const { id } = req.params;
  const { text, author } = req.body;
  const newComment = new Comment({ text, author, _parent: id});
  newComment.save()
    .catch((error) => {
      res.status(STATUS_USER_ERROR).json({ error });
    });  
  Post.findByIdAndUpdate(id, { $push: { comments: newComment._id }})
    .exec()
    .then((post) => {
      res.json(post)
    })
    .catch((error) => {
      res.status(STATUS_USER_ERROR).json({ error });
    });  
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost
};