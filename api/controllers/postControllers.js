const { Post, Comment} = require('../models/postModels');

const PostController = {
    createPost: async (req, res) => {
        try {
            const { author, title, content } = req.body;
            const post = new Post({ author, title, content });
            const savedPost = await post.save();
            res.json(savedPost);  
        } catch (error) {
            res.status(422).json({ error });
        }
    },
    getPosts: async (req, res) => {
        try {
            const posts = await Post.find({}).select('_id title').exec();
            res.json(posts);
        } catch (error) {
            res.status(422).json({ error });
        }
    },
    getPost: async (req, res) => {
        try {
           const { id } = req.params;
           const post = await Post.findOne({ _id: id}).populate('author').populate('comments').exec();
            res.json(post);
        } catch (error) {
            res.status(422).json({ error });
        }
    },
    addComment: async (req, res) => {
        try {
            const { id } = req.params;
            const { text, author } = req.body;

            const post = await Post.findOne({ _id: id}).exec();
            const comment = new Comment({ text, author });

            const savedComment = await comment.save();
            post.comments.push(savedComment);
            
            const savedPost = await post.save();
            res.json(savedComment);
        } catch (error) {
            res.status(422).json({ error });
        }
    }
};

module.exports = PostController;