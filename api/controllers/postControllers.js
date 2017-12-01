const mongoose = require('mongoose');

const Post = require('../models/postModels');

const STATUS_USER_ERROR = 422;

const createPost = (req, res) => {
  const { author, title, content } = req.body;
  const newPost = new Post({ author, title, content });
  newPost.save((err, createdPost) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
      return;
    }
    res.json(createdPost);
  });
};

const listPosts = (req, res) => {
  Post.find({}, { title: 1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR).json(err);
      return;
    });
};

const getPost = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .populate('author comments.author', 'username')
    .exec()
    .then(singlePost => {
      if (singlePost === null) throw new Error();
      res.json(singlePost);
    })
    .catch(err => res.status(422).json(err));
};

const updatePost = (req, res) => {
  const { id } = req.params;
  const { author, text } = req.body;
  const comment = { author, text };
  Post.findById(id)
    .then(post => {
      if (post === null) throw new Error();
      const comments = post.comments;
      comments.push(comment);
      post
        .save()
        .then(newPost => {
          Post.findById(newPost._id)
            .populate('comments.author', 'username')
            .exec((badError, savedPost) => {            
              if (badError) {
                throw new Error();
              }
              res.json(savedPost);
            });
        })
        .catch(err => {
          throw new Error();
        });
    })
    .catch(err => res.status(422).json({ error: 'No Post!'}));
};

module.exports = {
  createPost,
  listPosts,
  getPost,
  updatePost,
};