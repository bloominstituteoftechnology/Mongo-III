
const Post = require('../models/postModels');

const STATUS_USER_ERROR = 422;

const createNewPost = (req, res) => {
    const { author, title, content } = req.body;
    const newPost = new Post({ author, title, content });
    newPost.save()
    .then(post => {
        res.json(post);
      })
    .catch(err => {
        res.status(STATUS_USER_ERROR);
        res.json({ 'Error adding a blog post: ': err.message });
        return;
      });
};

const getAllBlogPosts = (req, res) => {
    Post.find({})
    .exec()
    .then(posts => {
        const newPosts = [];
        posts.forEach(post => {
            const postObj = {};
            postObj.title = post.title;
            postObj._id = post._id;
            newPosts.push(postObj);
        });
        res.json(newPosts);
    })
    .catch(err => {
        res.status(STATUS_USER_ERROR);
        res.json({ 'Error finding all the posts: ': err.message });
        return;
    });
};

const getPostById = (req, res) => {
    const { id } = req.params;
    Post.findById(id)
    .populate(' author comments.author', 'username')
    .exec()
    .then(post => {
        res.json(post);
    })
    .catch(err => {
        res.status(STATUS_USER_ERROR);
        res.json({ 'Error locating post: ': err.message });
        return;
      });
};

const addCommentsToPost = (req, res) => {
    const { id } = req.params;
    const { text, author } = req.body;
    const newComment = { text, author };
    Post.findById(id)
    .exec()
    .then(post => {
        post.comments.push(newComment);
        post.save()
        .then(savedPost => {
            Post.findById(savedPost._id)
            .populate('comments.author', 'username')
            .exec()
            .then(newSavedPost => {
                res.json(newSavedPost);
          })
          .catch(err => {
              res.status(STATUS_USER_ERROR);
              res.json({ 'Error populating & finding: ': err.message });
              return;
           });
        })
        .catch(err => {
            res.status(STATUS_USER_ERROR);
            res.json({ 'Error inserting a comment: ': err.message });
            return;
        });
      })
      .catch(err => {
          res.status(STATUS_USER_ERROR);
          res.json({ 'Error adding comment to post: ': err.message });
          return;
      });
};

module.exports = {
    createNewPost,
    getAllBlogPosts,
    getPostById,
    addCommentsToPost,
};
