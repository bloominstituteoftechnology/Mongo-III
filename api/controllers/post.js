const mongoose = require('mongoose');
const { handleErr, getPost } = require('../helpers');
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = {
  newPost: async (req, res) => {
    const { title, content, author } = req.body;
    try {
      const newPost = new Post({ title, content, author });
      const post = await newPost.save();
      const user = await User.findById(author);
      user.posts.push(newPost.id);
      await user.save();
      res.status(201).json(post);
    } catch (err) {
      handleErr(500, err.message, res);
    }
  },

  getPosts: async (req, res) => {
    try {
      const posts = await Post.find({}).populate('comments');
      res.status(200).json(posts);
    } catch (err) {
      handleErr(500, err.message, res);
    }
  },

  getPost: async (req, res) => {
    const { id } = req.params;
    try {
      const post = await getPost(id);
      res.status(200).json(post);
    } catch (err) {
      handleErr(500, err.message, res);
    }
  },

  newComment: async (req, res) => {
    const { id } = req.params;
    const { text, author } = req.body;
    try {
      const newComment = new Comment({ parent: id, text, author });
      await newComment.save();
      const post = await getPost(id);
      post.comments.push(newComment.id);
      await post.save();
      res.status(201).json(newComment);
    } catch (err) {
      handleErr(500, err.message, res);
    }
  }
};
