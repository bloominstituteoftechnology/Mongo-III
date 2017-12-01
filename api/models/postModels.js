const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  }
});

const PostSchema = new mongoose.Schema({
  author : { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  comments: [commentSchema]
});

const Post = mongoose.model('Post', PostSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = { 
    Post,
    Comment 
};