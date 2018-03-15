const express = require('express');
const Post = require('../models/postModels.js');
const postRouter = express.Router();
// const ObjectId = mongoose.Schema.Types.ObjectId;

postRouter.post('/new-post', (req, res) => {
  const newPostInfo = req.body;
  const post = new Post(newPostInfo);
  post
    .save()
    .then(savedPost => {
      res.status(200).json(savedPost);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'The post could not be saved', error: err });
    });
});

postRouter.get('/posts', (req, res) => {
  Post.find().then(posts => {
    res.status(200).json(posts);
  });
});

postRouter.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  console.log(id)
  Post.findById(id).then(post => {
    console.log(post)
    res.status(200).json(post);
  })
    .catch(err => {
      res.status(500).json({
        message: 'Error finding posts by that id',
        error: err
      })
    })
})

// postRouter.get('/posts/:id', (req, res) => {
//   const id = req.params.id;
//   console.log(id)
//   Post.findById(id, (err, post) => {
//     console.log(post);
//     console.log(err);
//     res.status(200).json(post)
//   })
// })

module.exports = postRouter;
