const mongoose = require('mongoose');

require("../models/postModels.js");
require("../models/userModels.js");

const Post = mongoose.model('Post');
const User = mongoose.model('User');

const STATUS_USER_ERROR = 422;

const newPost = (req, res) => {
  const { author, title, content } = req.body;
  let id = author;
  const post = new Post({ author: id, title, content });
  post.save()
    .then((postBack) => {
      res.json(postBack)
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR);
      res.json(err);
    });
};

const getPosts = (req, res) => {
  Post.find({})
    .populate()
    .exec()
    .then((allPosts) => {
      res.json(allPosts);
    })
    .catch((err) => {
      res
        .status(STATUS_USER_ERROR)
        .json(err);
    });
};

const getPost = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .populate('author', 'username')
    .populate('comments.author', 'username')
    .exec()
    .then((post) => {
      const returnPost = {
        title: post.title, 
        _id: post._id, 
        author: post.author.username,
        content: post.content, 
        comments: post.comments.map((comment) => {
          return { text: comment.text, author: comment.author.username }
        })
      }
      res.json(returnPost);
    })
    .catch((err) => {
      res
        .status(STATUS_USER_ERROR)
        .json(err);
    })
};

const addComment = (req, res) => {
  const { id } = req.params;
  const { text, author } = req.body;
  Post.findById(id)
    .populate()
    .exec()
    .then((post) => {
      post.comments.push({ text, author });
      post.save()
        .then((commentBack) => {
          console.log(commentBack)
          res.json({ success: true })
        })
        .catch((err) => {
          console.log(err)
          res.status(STATUS_USER_ERROR);
          res.json(err);
        });
    })
    .catch(err => {
      res
        .status(STATUS_USER_ERROR)
        .json(err);
    })
};

module.exports = {
    newPost,
    getPosts,
    getPost,
    addComment
  };