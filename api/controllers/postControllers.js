const { Post, Comment } = require('../models/postModels');

function createPost(req, res) {
  const newPost = new Post(req.body);
  newPost.save()
    .then(post => res.status(201).json(post))
    .catch(err => res.status(422).json(err));
};

function listPosts(req, res) {
  Post.find()
    .populate('author', 'username')
    .exec()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json(err));
};

function getPost(req, res) {
  const { id } = req.params;
  Post.findById(id)
    .populate('author', 'username')
    .exec()
    .then(post => res.status(200).json({
        title: post.title,
        author: post.author,
        content: post.content,
        comments: post.comments,
      }))
    .catch(err => res.status(422).json(err));
};

function addComment(req, res) {
  // this is called addComment as the purpose of this function is not to actually update a post, but add a comment to an existing post.
  const { id } = req.params;
  const { author, text } = req.body;

  const newComment = new Comment({ parentId: id, author, text });

  newComment.save().then(result => res.status(201)).catch(err => res.status(422).json(err));

  Post.findById(id)
  .populate("author", "text") // I think this is trying to populate based on the post itself and not the comment, which is why it fails...
    .exec()
    .then(post => {
      post.comments.push(newComment);
      post.save();
      res.status(201).json({newComment});
    })
    .catch(err => res.status(500).json(err));
}

module.exports = { createPost, listPosts, getPost, addComment };
