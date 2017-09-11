const mongoose = require('mongoose');

const Post = require('../models/postModels');

const createPost = (req, res) => {
    const { author, title, content } = req.body;
    const newPost = new Post({ author, title, content });
    newPost.save()
            .then((post) => {
                res.json(post);
            })
            .catch((err) => {
                res.status(422).json(err);
            });
};

const getPosts = (req, res) => {
    Post.find({})
        .exec()
        .then((post) => {
            res.json(post)
        })
        .catch((err) => {
            res.status(422).json(err);
        });
}

const getSinglePost = (req, res) => {
    const { id } = req.params;
    Post.findById(id)
        // .populate('author comments.author', 'username')
        .exec()
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            res.status(422).json(err);
        });
}

const createComment = (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const comment = { text, author: id, _id: id };
    Post.findByIdAndUpdate(id)
        .exec()
        .then((post) => {
            post.comments.push(comment);
            post.save();
            res.json(post);
        })
}

module.exports = {
    createPost,
    getPosts,
    getSinglePost,
    createComment
}