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
const postGetById = (req, res) => {
    const { id } = req.params;
    Post.findById(id)
    .populate('author', 'username')
    .exec()
    .then((singlePost) => {
        if (singlePost === null) throw new Error();
        res.json(singlePost);
    })
    .catch(err => res.status(422).json(err));
};
const postCommentAdd = (req, res) => {
    const { id } = req.params;
    const { author, text } = req.body;
    const comment = { author, text };
    post.findById(id)
    .then(post => {
        if(post === null) throw new Error();
        const comments = post.comments;
        comments.push(comments);
        post.save({new: true}).then(newPost => res.json(newPost))
        .catch(err => res.status(422).json({ error: 'bad'}));
    })
    .catch(err => {
        res.status(422).json({error: 'No Post!'})
    });
};

module.exports = {
    postCreate,
    postGetAll,
    postGetById,
    postCommentAdd
};