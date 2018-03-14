const mongoose = require("mongoose");
const Post = require("../models/postModels");
const Comment = require("../models/commentModel");

const createPost = (req, res) => {
  const { author, title, content } = req.body;
  const newPost = new Post({ author, title, content });
  newPost
    .save()
    .then(newPost => {
      res.json(newPost);
    })
    .catch(err => {
      res.status(500).json({ message: "Error creating new post" });
    });
};

const getPosts = (req, res) => {
  Post.find()
    .exec()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "Error getting posts" });
    });
};

const getPost = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .populate("author", "userName")
    .populate({
      path: "comments",
      populate: { path: "author", select: "userName" }
    })
    .exec()
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "Error getting post by id" });
    });
};

const updatePost = (req, res) => {
  const { id } = req.params;
  const { author, title, content } = req.body;
};
