const Post = require('../models/postModels');

const createNewPost = (req, res) => {
    const {author, title, content} = req.body;
    const newPost = new Post({ author, title, content});
    newPost.save(newPost, (err, post) => {
        if(err) {
            res.status(422);
            res.json({'There was an error inserting the blog post: ': err.message});
            return;
        }
        res.json(post);
    });
};

const getAllBlogPosts = (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            res.status(422);
            res.json({'Error finding all Posts: ': err.message});
            return;
        }
        const newPosts = [];
        posts.forEach((post) => {
            const postObject = {};
            postObject.title = post.title;
            postObject._id = post._id;
            newPosts.push(postObject);
        });
        res.json(newPosts);
    });
};

const getPostById = (req, res) => {
    const { id } = req.params; 
    Post.findById(id)
    .populate('author comments.author', 'username')
    .exec((err, post) => {
        if (err) {
            res.status(422);
            res.json({'Error finding the specified postID: ': err.message});
            return;
        }
        res.json(post);
    });
};

const addCommentsToPost = (req, res) => {
    const { id } = req.params;
    const { text, author } = req.body;
    const newComment = { text, author };
    Post.findById(id, (err, post) => {
        post.comments.push(newComment);
        post.save((errTwo, newPostSave) => {
            if(errTwo) {
                res.status(422);
                res.json({'Error inserting comments: ': errTwo.merssage});
                return;
            }
            Post.findById(newPostSave._id)
            .populate('comments.author', 'username')
            .exec((errLast, lastPost) => {
                if(errLast) {
                    res.status(422);
                    res.json({'Error populating/finding: ': errLast.message});
                    return;
                }
                res.json(lastPost);
            });
        });
    });
};

module.exports = {
    createNewPost,
    getAllBlogPosts,
    getPostById,
    addCommentsToPost,
};