const express = require('express');
const mongoose = require('mongoose');

const STATUS_SUCCESS = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

const Post = require('../models/postModels.js');

const newPost = (req, res) => {
  const blogPost = req.body;

  const {
    author,
    title,
    content
  } = req.body;

  const post = new post(blogPost);

  if (!title || !content) {
    console.log(error);
    res.status(STATUS_USER_ERROR).json({ errorMessage: "Please provide both title and content for the post." });
  } else {
    post
      .save()
      .then(newPost => {
        res.status(STATUS_SUCCESS).json(newPost);
      })
      .catch(error => {
        console.log(error);
        res.status(STATUS_SERVER_ERROR).json({ error: "There was an error while saving the post to the Database." });    
      });
  }
};

const posts = (req, res) => {

  Post.find({})
    .exec()
    .then(posts => {
      res.status(STATUS_SUCCESS).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(STATUS_SERVER_ERROR).json({ error: "There was an error while retrieving the posts from the Database." })
    });
};

const post = (req, res) => {
  const id = req.params.id;

  Post.findById(id).populate('author', 'comments')
    .exec()
    .then(post => {
      if (post) {
        res.status(STATUS_SUCCESS).json(post);
      } else {
        console.log(error);
        res.status(STATUS_NOT_FOUND).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(STATUS_SERVER_ERROR).json({ error: "There was an error while retrieving the post from the Database." })
    })
};

const editPost = (req, res) => {
  const id = req.params.id;

  const {
    comments
  } = req.body;

  User.findByIdAndUpdate(id, req.body).push('comments')
    .exec()
    .then(newComment => {
      if (newComment) {
        res.status(STATUS_SUCCESS).json(newComment);
      } else {
        console.log(error);
        res.status(STATUS).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(STATUS_SERVER_ERROR).json({ error: "The comment could not be updated." })
    });
};

module.exports = {
  newPost,
  posts,
  post,
  editPost
};