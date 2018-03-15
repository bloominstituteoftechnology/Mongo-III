const Post = require('../models/postModels');

function createPost(req, res) {
  const newPost = new Post(req.body);
  newPost.save()
    .then(post => res.status(201).json(post))
    .catch(err => res.status(422).json(err));
};

function listPosts(req, res) {
  Post.find()
    .populate('author', 'username')
    .exec()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json(err));
};

function getPost(req, res) {
  const { id } = req.params;
  Post.findById(id)
    .populate('author', 'username')
    .exec()
    .then(post => res.status(200).json({
        title: post.title,
        author: post.author,
        content: post.content,
        comments: post.comments,
      }))
    .catch(err => res.status(422).json(err));
};

module.exports = { createPost, listPosts, getPost };
