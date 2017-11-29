const Posts = require('../models/postModels');
const Users = require('../models/userModels');
const mongoose = require('mongoose');

module.exports = {
  create: (req, res) => {
    const { title, content, author } =  req.body;
    const post = new Posts({ title, content, author });
    post.save(err => err ? res.status(422).json({ error: err }) : res.json(post));
  },
  findAll: (req, res) => {
    Posts.find()
      .select('title _id')
      .exec((err, posts) => err ? res.status(422).json({ error: err }) : res.json(posts));
  },
  find: (req, res) => {
    const { id } = req.params;
    Posts.findById(id)
      .populate('author comments.author', 'username')
      .exec((err, post) => err ? res.status(422).json({ error: err }) : res.json(post));    
  },
  add: (req, res) => {
    const { id } = req.params;
    const { text, author } = req.body;
    Posts.findByIdAndUpdate(id, { "$push": { "comments": { text, author } } })
      .exec((err, post) => err ? res.status(422).json({ error: err }) : res.json(post));        
  },
  //added some for fun
  likeAdd: (req, res) => { //this adds likes to a specific comment within a post
    const { id } =req.params;
    let { likes } = req.body;
    Posts.findOne({ "comments._id": id })
      .exec((err, post) => {
      if (err) return res.status(422).json({ error: err });
      const index = post.comments.findIndex((comment) => comment.id === id);
      post.comments[index].likes++;
      post.save((err, newPost) => {
        if (err) return res.status(422).json({ error: err });
        res.json(newPost);
      })
    })
  },
  sort: (req, res) => { //this sorts the comments by their likes, slightly buggy must refresh page(WIP)
    const { id } = req.params;
    const { best } = req.body;
    Posts.findById(id)
    .populate('author comments.author', 'username')
    .exec((err, post) => {
      if (err) return res.status(422).json({ error: err });      
      if (best) post.comments = [].concat(post.comments).sort((a, b) => b.likes - a.likes);
      if (!best) post.comments = [].concat(post.comments).sort((a, b) => a.likes - b.likes);
      post.save((err, newPost) => {
        if (err) return res.status(422).json({ error: err });
        res.json(newPost);
      })
    });
  },
  aggregate: (req, res) => { //this groups the users with the amount of posts they have posted and sorts them
    Posts
      .aggregate([
        {
          $group: {
            _id: '$author',
            count: {
              $sum: 1
            }
          }
        },
        {
          $sort: {
            count: -1
          }
        },
        {//alternative to using populate within aggregate
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'author'
          }
        },//hides the authors password
        { $project: {
          "author.password": 0
        }}
    ],
    (err, results) => {
      res.json(results);
    });
  }
}