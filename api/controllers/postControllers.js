const mongoose = require('mongoose'); 

const Post = mongoose.model('Post');
const Comments = mongoose.model('Comments'); 

const STATUS_USER_ERROR = 422; 

const newPost = (req, res) => {
    const { author,title,content } = req.body;
    const post = new Post({ author,title,content });
    newPost.save(newPost, (err, post) => {
        if (err) {
            res.status(STATUS_USER_ERROR);
            res.json({ 'Error inserting blog post': err.message });
            return;
        }
        res.json(post);
    });
};

const getPosts = (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            res.status(STATUS_USER_ERROR);
            res.json({ 'Error finding blog post': err.message });
            return;
        }
        const newPosts = [];
        posts.forEach((post) => {
            const postObj = {};
            postObj.title = post.title;
            postObj._id = postObj._id;
            newPosts.push(postObj);
        });
    res.json(newPosts)
    });
};

const addComment = (req, res) => {
    const { id } = req.params;
    const { text, author } = req.body;
    const newComment = { text, author }; 
    Post.findById(id) 
        .populate(id, (err, post) => {
            post.Comments.push(newComment);
            post.save((err, newSavePost) => {
                if (err) {
                    res.status(STATUS_USER_ERROR);
                    res.json({ 'Error comment': err.message });
                    return;
                }
            post.findById(newSavePost._id)
                .populate('comments.author', 'username')
                .exec((err, post) => {
                    if (err) {
                        res.status(STATUS_USER_ERROR);
                        res.json({ 'Error populate': err.message });
                        return;
                    }
                    res.json(post);   
                });
        });
    });
};

const getPostsById = () => {
    const { id } = req.params;
    Post.findById(id)
        .populate('username', 'author')
        .exec((err, post) => {
            if (err) {
                res.status(STATUS_USER_ERROR);
                res.json({ 'Error finding blog post': err.message });
                return;
            }
            res.json(post)
        });
}

module.export = {
    newPost,
    getPosts,
    addComment,
    getPostsById
}

