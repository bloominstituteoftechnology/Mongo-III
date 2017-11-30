const mongoose = require('mongoose');

const { Post, Comment } = require('../models/postModels.js');

const createPost = (req, res) => {
  const { author, title, content } = req.body;
  const newPost = new Post({ author, title, content });
  newPost
    .save()
    .then(nPost => res.json(nPost))
    .catch(err => res.status(422).json(err));
};

const listPosts = (req, res) => {
  Post
    .find({})
    .populate('author', 'username')
    .exec()
    .then(posts => res.json(posts))
    .catch(err => res.status(500).json(err));
};

const getPost = (req, res) => {
  const { id } = req.params;
  Post
    .findById(id)
    .populate('author', 'username')
    .populate({
      path: 'comments',
      model: 'comment',
      populate: {
        path: 'author',
        model: 'user',
        select: 'username',
      },
    })
    .exec()
    .then((post) => {
      const tempPost = {
        title: post.title,
        author: post.author,
        content: post.content,
        comments: post.comments.map(comment => ({
          author: comment.author.username,
          text: comment.text,
        })),
      };
      res.json(tempPost);
    })
    .catch(err => res.status(422).json(err));
};

const updatePost = (req, res) => {
  // it's suggested that this is an update to the post.
  // for the point of this exercise this is just to add comments.
  const { id } = req.params;
  const { author, text } = req.body;

  const newComment = new Comment({ parentId: id, author, text });

  newComment
    .save()
    .catch(err => res.status(422).json(err));

  Post
    .findById(id)
    .exec()
    .then((post) => {
      post.comments.push(newComment);
      post.save();
      res.json(newComment);
    })
    .catch(err => res.status(500).json(err));
};

module.exports = {
  createPost,
  listPosts,
  getPost,
  updatePost,
};
