const PostModel = require('../models/postModels'); //mongoose instance

const createPost = (req, res) => {
    const post = new PostModel(req.body);
    post.save()
        .then(pst => res.status(201).send(pst))
        .catch(err => {
            res.status(500).send({error: "Something went wrong saving the post", info: err});
        });
};

const getAllPosts = (req, res) => {
    PostModel.find({})
        .populate('author')
        .exec((err, post) => {
            res.status(200).send(post)
        });
};

const getPostById = (req, res) => {
    PostModel.findById(req.params.id)
        .populate({
            path: 'author',
        })
        .populate({
            path: 'comments.author',
        })
        .exec((err, post) => {
            res.status(200).send(post)
        });
};

const updatePostById = (req, res) => {
    PostModel.findByIdAndUpdate(req.params.id, { "$push": { "comments": req.body } }, { new: true })
        .populate('author')
        .exec((err, post) => {
            res.status(200).send(post)
        });
};

module.exports = {createPost, getAllPosts, getPostById, updatePostById};