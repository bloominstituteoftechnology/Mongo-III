const mongoose = require('mongoose');
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = {
  newPost: async (req, res) => {
    const { title, content, author } = req.body;
    const newPost = new Post({ title, content, author });
    const post = await newPost.save();
    const user = await User.findById(author);
    user.posts.push(newPost.id);
    await user.save();
    res.status(201).json(post);
  },

  getPosts: async (req, res) => {
    const posts = await Post.find({}).populate('comments');
    res.status(200).json(posts);
  },

  getPost: async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id).populate('comments');
    res.status(200).json(post);
  },

  newComment: async (req, res) => {
    const { id } = req.params;
    const { text, author } = req.body;
    const newComment = new Comment({ parent: id, text, author });
    await newComment.save();
    const post = await Post.findById(id).populate('comments');
    post.comments.push(newComment.id);
    await post.save();
    res.status(201).json(newComment);
  }
};
