const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const CommentSchema = new mongoose.Schema({
  parentId: {
    type: ObjectId,
    ref: 'Post',
  },
  author: {
    type: ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    required: true,
  },
});

const PostSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [{
    type: ObjectId,
    ref: 'Comment',
  }],
});

const Post = mongoose.model('Post', PostSchema);
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Post, Comment };
