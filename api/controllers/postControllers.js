const Post = require("../models/postModels");
const Comment = require("../models/commentModels");
const utils = require("../utils")();

module.exports = () => {
  return {
    create: (req, res) => {
      const { title, content, author } = req.body;
      const newPost = new Post({ title, content, author });
      newPost.save((err, post) => {
        return err ? utils.errHandler(500, "Server error saving this new post", res) : res.json(post);
      });
    },
    getAll: (req, res) => {
      console.log('getting all the posts')
      Post.find()
        .populate("author comments", "username author text")
        .exec()
        .then(posts => posts ? res.json(posts) : utils.errHandler(404, "There are no posts.", res))
        .catch(err => utils.errHandler(500, "Server error retrieving your posts.", res));
    },
    getOne: (req, res) => {
      const { id } = req.params;
      Post.findById(id)
        .populate('comments author', 'username')
        .exec()
        .then(post => post ? res.json(post) : utils.errHandler(404, 'This post is not found.', res))
        .catch(err => utils.errHandler(500, 'Server error retrieving post', res));
    },
    updateOne: (req, res) => {
      const { id } = req.params;
      const { text, author } = req.body;
      Post.findByIdAndUpdate(id,
        { $push: { comments : { text, author }}},
        { new: true, safe: true,  upsert: true },
        (err, post) => {
          return err ? utils.errHandler(500, 'Server error adding this comment to the post', res) : res.json(post);
        })
    },
    createComment: async (req, res) => {
      console.log('Hit this endpoint', req.body);
      const { id } = req.params;
      const commentBody = {
        text: req.body.text,
        author: req.body.author,
        _parent: id
      }
      let newComment;
      try { newComment = await new Comment(commentBody).save() } 
      catch(e) { return utils.errHandler(500, 'Sorry, could not create this comment', res);}
      Post.findByIdAndUpdate(id,
        { $push: { comments: newComment._id }},
        { new: true, upsert: true, safe: true },
        (err, post) => {
          return err ? utils.errHandler(500, 'Server error adding this comment to the post', res) : res.json(post);
        });
    }
  };
};
