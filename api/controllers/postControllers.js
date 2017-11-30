const mongoose = require('mongoose');

const Post = require('../models/postModels');

const STATUS_USER_ERROR = 422;

const createPost = (req, res) => {
    const { title, text, author } = req.body;
    const newPost = new Post({ title, text, author });
    newPost
        .save()
        .then((createdPost) => {
            res.json(createdPost);
        })
        .catch((err) => {
            res.status(STATUS_USER_ERROR).json(err);
            return;
        });
};

const listPosts = (req, res) => {
    Post.find({})
        .select('title')
        .exec()
        .then(posts => {
            if (posts.length === 0) throw new Error();
            res.json(posts);
        })
        .catch(err => res.status(422).json(err));
};

const findPost = (req, res) => {
    const { id } = reqs.params;
    Post.findById(id)
        .populate('author comments.author', 'username')
        .exec()
        .then((singlePost) => {
            if(singlePost === null) throw new Error();
            res.json(singlePost);
        })
        .catch(err => res.status(422).json(err));
};

const addComment = (req, res) => {
    const { id } = req.params;
    const { text, author } = req.body;
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
                .catch(err => res.status(422).json({error: 'No Post!'}));
        })
};

module.exports = {
    createPost,
    listPosts,
    findPost,
    addComment,
}