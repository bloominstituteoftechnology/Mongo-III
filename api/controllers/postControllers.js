const Comment = require('../models/commentModels');
const Post = require('../models/postModels');
const User = require('../models/userModels');
const { errorHandler } = require('../util');

const getPost = (req, res) => {
  Post.findOne({ _id: req.params.id }).populate({ 
      path: 'comments',
      populate: {
        path: 'author',
        select: 'name -_id'
      }
    }).populate({
      path: 'author',
      select: 'name -_id'
    })
    .then((post) => {
      if (post == null) {
        return res.send("There's nothing to see here");
      }
      res.send(post);
    })
    .catch((error) => errorHandler(error, req, res, 'PostFindError'));
};

const getPosts = (req, res) => {
  Post.find()
    .then((posts) => {
      if (posts == null || posts.length === 0) {
        return res.send("There's nothing to see here");
      }
      res.send(posts.map((post) => {
        return { title: post.title, _id: post._id };
      }));
    })
    .catch((error) => errorHandler(error, req, res, 'PostFindError'));
};

const addPost = (req, res) => {
  const { author, title, content } = req.body;
  if (author == false || title == false || content == false) {
    return errorHandler({
      error: 'Missing arguments',
      required: ['author', 'title', 'content']
    }, req, res);
  }
  User.findOne({ _id: author })
    .then((author) =>{
      new Post({ author, title, content }).save().populate({ 
          path: 'comments',
          populate: {
            path: 'author',
            select: 'name -_id'
          }
        }).populate({
          path: 'author',
          select: 'name -_id'
        })
        .then((post) => res.send(post))
        .catch((error) => errorHandler(error, req, res, 'PostSaveError'));
    })
    .catch((error) => errorHandler(error, req, res, 'UserFindError'));
};

const addComment = (req, res) => {
  const { text, author } = req.body;
  if (author == false || text == false) {
    return errorHandler({
      error: 'Missing arguments',
      required: ['author', 'text']
    }, req, res);
  }
  User.findOne({ _id: author })
    .then((author) => {
      Post.findOne({_id: req.params.id })
        .then((post) => {
          if (post) {
            new Comment({ text, author }).save()
              .then((comment) => {
                post.comments.push(comment);
                post.save().populate({ 
                    path: 'comments',
                    populate: {
                      path: 'author',
                      select: 'name -_id'
                    }
                  }).populate({
                    path: 'author',
                    select: 'name -_id'
                  })
                  .then((post) => res.send(post))
                  .catch((error) => errorHandler(error, req, res, 'PostSaveError'));
              })
              .catch((error) => errorHandler(error, req, res, 'CommentSaveError'));
          } else {
            errorHandler({}, req, res, 'PostNullError');
          }
        })
        .catch((error) => errorHandler(error, req, res, 'PostFindError'));
    })
    .catch((error) => errorHandler(error, req, res, 'UserFindError'));
};

module.exports = { getPost, getPosts, addPost, addComment };
