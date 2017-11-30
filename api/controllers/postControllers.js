//const mongoose = require('mongoose');
const Post = require('../models/postModels');

const STATUS_USER_ERROR = 422;

const createPost = (req, res) => {
  const { title, content, author } = req.body;
  const newPost = new Post({ title, content, author });
  newPost
    .save()
    .then((createdPost) => {
      res.json(createdPost);
    })
    .catch((err) => {
      res.status(500).json(err);
      return;
    });
};
const getPosts = (req, res) => {
  const { title } = req.body;
  Post.find({}/*, "title"*/)
    .select('title')
    .exec()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR).json(err);
      return;
    });
};
const findPost = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .populate('author comments.author', 'username')
    .exec()
    .then((post) => {
      if (post === null) {
        throw new Error();
      }
      res.json(post);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR).json(err);
    }); 
};
const updatePost = (req, res) => {
  const { id } = req.params;
  const { author, text } = req.body;
  const newComment = { author, text };
  // find post by id 
  // add comment to that post by grabbing comment array 
  // save the post again
  Post.findById(id) 
    .then(post => {
      if (post === null) {
        throw new Error();
      }
      const comments = post.comments;
      comments.push(newComment);
      post
        .save()
        .then(newPost => {
          Post.findById(newPost._id)
            .populate('comments.author', 'username')
            .exec((badError, savedPost) => {
              if (badError) {
                throw new Error();
              };
              res.json(savedPost);
            });
        })
        .catch(err => {
          res.status(422).json(err);
        });
    })
    .catch(err => {
      res.status(422).json({ error: 'No Post!' });
    });
};
module.exports = {
  createPost,
  getPosts,
  findPost,
  updatePost
}