const mongoose = require('mongoose');
const Post = require('../models/postModels');
const User = require('../models/userModels');
const Comment = require('../models/commentModel');

const STATUS_SERVER_ERROR = 500;
const STATUS_USER_ERROR = 422;

const listPosts = (req, res) => {
  Post.find({})
  .exec((err, posts) => {
  return err ? res.status(STATUS_SERVER_ERROR).json(err) : res.json(posts);
  });
};

const getPost = (req, res) => {
  const { id } = req.params;
  console.log(id);
  Post.findById(id) 
  .exec((err, post) => {
    console.log(post);
    return err ? res.status(STATUS_SERVER_ERROR).json(err) : res.json(post);
  });
};

const addPost =  (req, res) => {
  const { title, content, author } = req.body;
 // console.log(req.body);
  const post = new Post({ title, content, author});
  post.save();
  User.findOne({_id: post.author}, (err, user) => {
    if (err) return res.status(STATUS_USER_ERROR).json(err);
    user.posts.push(post._id);
  })
  .populate('posts')
  .exec((e,user) => {
    user.save(); 
    return e ? res.status(STATUS_SERVER_ERROR).json(e) : res.json(post);
  });
};

const addComment = (req, res) => {
  const { id } = req.params.id;
  const { text, author } = req.body;
  const comment = new Comment({ text, author });
  comment.save();
  Post.findOne(id, (err, post) => {
    if (err) return res.status(STATUS_USER_ERROR).json(err);
    post.comments.push(comment._id);
    post.save();
  })
  .populate('comments')
  .exec((err, post) => {
    console.log(post);
    post.save();
    return err ? res.status(STATUS_USER_ERROR).json(err) : res.json(comment);
  });
};

module.exports = {
  listPosts,
  getPost,
  addPost,
  addComment
}