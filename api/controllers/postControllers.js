const mongoose = require('mongoose');

const Post = require('../models/postModels');
const User = require('../models/userModels');

const STATUS_USER_ERROR = 422;

const createPost = (req, res) => {
    const { title, content, author } = req.body;
    const newPost = new Post({ title, content, author });
    newPost.save(newPost, (err, createdPost) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json(createdPost);
    });
};

const listPosts = (req, res) => {
    Post.find({})
        .select('title')
        .exec()
        .then((posts) => {
            if (posts.length === 0) {
                throw new Error();
            }
            res.json(posts);
        })
        .catch((err) => {
            res.status(STATUS_USER_ERROR).json(err);
        });
};

const getPostById = (req, res) => {
    const { id } = req.params;

    Post.findById({ id })
        .populate('author', 'username')
        .exec()
        .then((post) => {
            if (post === null) {
                throw new Error();
            }
            res.json(post);
        })
        .catch((err) => {
            res.status(422).json(err);
        });
};

/* POST ADD COMMENT **** NEED TO REVIEW */
const addPostComment = (req, res) => {
    const { id } = req.params;
    const { author, text } = req.body;
    const comment = { author, text };

    Post.findById({ id })
        .then((post) => {
            if (post === null) {
                throw new Error();
            }
            const comments = post.comments;
            comments.push(comment);
            post
                .save()
                .then((newPost) => {
                    Post.findById(newPost._id)
                        .populate('comments.author', 'username')
                        .exec((badError, savedPost) => {
                            if (badError) {
                                throw new Error();
                            }
                            res.json(savedPost);
                        });
                })
                .catch((err) => {
                    throw new Error();
                });
        })
        .catch((err) => {
            res.status(422).json({ error: 'No Post found'});
        });
};

module.exports = {
    createPost,
    listPosts,
    getPostById,
    addPostComment
}