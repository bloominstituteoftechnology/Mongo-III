const mongoose = require('mongoose');

const { User } = require('../models/userModels');
const { Post, Comment } = require('../models/postModels');

const success = true;
const failure = false;
const SERVER_USER_ERROR = 422;

// helper function to send errors
const sendUserError = (err, res) => {
  res.status(SERVER_USER_ERROR);
  if (typeof err === 'string') {
    res.json({ err });
    return;
  }
  res.json(err);
}

// creates a new post for the loged in user
const newPost = (req, res) => {
  const { title, author, content} = req.body;
  if (!title || !author || !content) {
    sendUserError('please provide full information', res);
    return;
  }
  const post = new Post({ title, author, content });
  post.save((err) => {
    if (err) {
      sendUserError(err, res);
      return;
    }
    res.json(post);
  });
};

// returns all the posts the user has published
const getAllPosts = (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      sendUserError(err, res);
      return;
    }
    res.json(posts);
  });
};

// returns a single post back to the user
const getSinglePost = (req, res) => {
  const { id } = req.params;
  if ( !id ) {
    sendUserError('please provide an id', res)
  }
  Post.findById(id)
  .populate('author comments.author', 'username')
  // .populate('comments.author', 'username')
  .exec((err, post) => {
    if (err) {
      sendUserError(err);
      return;
    }
    res.json(post);
  });
};

// adds a comment to the current post
const addComment = (req, res) => {
  const { id } = req.params;
  const { text, author } = req.body;
  const comment = { text, author };
  if (!text|| !author) {
    sendUserError('please provide text and author', res);
    return;
  }

  Post.findById(id, (err, post) => {
    post.comments.push(comment)
    post.save((err, savedComment) => {
      Post.findById(savedComment._id)
      .populate('comments.author', 'username')
      .exec((err, populatedComment) => {
        if (err) {
          sendUserError(err);
          return;
        }
        // console.log(populatedComment.comments);
        res.json(populatedComment.comments);
      });
    });
  });
};

const showAllComments = (req, res) => {
  const parentId = req.params.id;
  Post.findById(parentId, (err, comments) => {
    if (err) {
      sendUserError(err);
      return;
    }
    res.json(comments);
  })
};



module.exports = {
  newPost,
  getAllPosts,
  getSinglePost,
  addComment,
  showAllComments,
};
