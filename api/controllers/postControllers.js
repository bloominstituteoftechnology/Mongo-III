const Post = require('../models/postModels');

const createPost = (req, res) => {
  const { title, content, author } = req.body;
  const post = new Post({ title, content, author, comments: [] });
  post
    .save()
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: 'There was an error!', error: err });
    });
};

const getPosts = (req, res) => {
  Post.find({})
    .select('title')
    .then(posts => {
      if (!posts) {
        res.status(404).json({ message: 'No such post found!' })
      } else {
        res.status(200).json(posts);
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'There was an error!', error: err });
    });
};

const findById = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .populate('author')
    .then(post => {
      if (!post) {
        res.status(404).json({ message: 'No such post found!' });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'There was an error!', error: err });
    });
}

module.exports = {
  createPost,
  getPosts,
  findById
};