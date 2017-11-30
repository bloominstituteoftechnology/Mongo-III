const Post = require('../models/postModels')

const postCreate = (req, res) => {
    const {title, content, author } = req.body;
    const newPost = new Post({title, content, author});
    newPost.save(newPost, (err, savedPost) => {
        if(err) {
            res.status(500).json(err);
            return;
        }
        res.json(savedPost);
    });
};
const postGetAll = (req, res) => {
    Post.find({})
    .then(posts => {
        res.json(posts)
    })
    .catch(err => res.status(422).json(err));
};
const postGetById = (req, res) => {};
const postCommentAdd = (req, res) => {};

module.exports = {
    postCreate,
    postGetAll,
    postGetById,
    postCommentAdd
};