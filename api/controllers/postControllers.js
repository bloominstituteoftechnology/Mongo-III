const mongoose = require('mongoose');

const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const statusCodes = require('../../common/statusCodes.js');
const { log, catchLog } = require('../../common/console.js');
/* eslint-disable no-console */
/* Fill in each of the below controller methods */
const createPost = (req, res) => {
  const { _id, author, title, content, comments } = req.body;
  console.log(`createPost title:${title}`);
  const newPost = new Post({ _id, author, title, content, comments });
  newPost
    .save()
    .then((createdPost) => {
      User.findById(author)
        .exec()
        .then((user) => {
          user.posts.push(createdPost);
          user
            .save()
            .then(() => {
              res.status(statusCodes.created).json(createdPost);
            })
            .catch((userErr) => {
              res.status(statusCodes.serverError).json({
                message: `user save error: ${userErr.message}`
              });
            });
        });
    })
    .catch((err) => {
      log('<<<<<<<<<<<<<<<<err message:', err.message);
      res.status(statusCodes.userError).json({ errorMessage: err.message });
      return;
    });
};

const listPosts = (req, res) => {
  // const uuID = window.localStorage.getItem('uuID');
  Post.find({})
    .populate('comments', 'text')
    .exec()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.status(statusCodes.serverError).json({ error: err.message });
    });
};
/* eslint-disable no-underscore-dangle */
const findPost = (req, res) => {
  const { id: postID } = req.params;
  console.log(`findPost postID: ${postID}`);
  console.log(`req.params.id: ${req.params.id}`);
  Post.findById(postID)
  .populate('comments')
  .exec()
  .then((post) => {
    res.json(post);
  })
  .catch((err) => {
    console.log('findPost err:', err.message);
    res.status(statusCodes.userError).json({ error: `not found: ${err.message}` });
  });
};

const addComment = (req, res) => {
  const { id } = req.params;
  console.log('addComment req.body', req.body);
  const { text, author } = req.body;
  const newComment = new Comment({ _parent: id, author, text });
  newComment
    .save()
    .then((comment) => {
      Post.findById(id, (postErr, post) => {
        if (postErr || !post) {
          res.status(statusCodes.userError).json({
            message: `post not found${postErr ? postErr.message : ''}`
          });
        } else {
          post.comments.push(comment);
          post.save()
          /*
          .then((updatePost) => {
            User.findById(updatePost.author)
            .exec()
            .then((user) => {
              user.posts.push(updatePost)

          })
          */
          .then(() => {
            console.log('adcomment comment:', comment);
            res.json(comment);
          })
          .catch((err) => {
            console.log('addComment error 96:', err.message);
            res.status(statusCodes.userError).json({ error: err.message });
          });
        }
      });
    })
    .catch((err) => {
      console.log('addComment error 103:', err.message);
      res.status(statusCodes.userError).json({ error: err.message });
    });
};

// In this function, we need to delete the comment document
// We also need to delete the comment's parent post's reference
// to the comment we just deleted
const deleteComment = (req, res) => {};

// Similarly, in this function we need to delete the post document,
// along with any comments that are the children of this post
// We don't want any orphaned children in our database
const deletePost = (req, res) => {};

module.exports = {
  createPost,
  listPosts,
  findPost,
  addComment,
  deleteComment,
  deletePost
};
