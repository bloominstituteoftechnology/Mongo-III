const Post = require('../models/postModels');
const Comment = require('../models/postModels');

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
  .select('_id title')
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

const findPost = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .populate('author comments.author', 'username')
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
};

const updatePost = (req, res) => {
  const { id } = req.params;
  const { author, text } = req.body;
  const comment = { author, text };
  Post.findById(id)
    .then(post => {
        console.log(post)
        const comments = post.comments;
        comments.push(comment);
        console.log(comments)
        post
          .save()
          .then(post => {
            Post.findById(post._id)
              .populate('comments.author', 'username')
              res.json(post);
          });
      
    })
    .catch(err => {
      res.status(500).json({ message: 'There was an error!' });
    });
};

module.exports = {
  createPost,
  getPosts,
  findPost,
  updatePost
};