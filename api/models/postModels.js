const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const PostSchema = Schema({
  // author: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [CommentSchema]
});

module.exports = mongoose.model('Post', PostSchema);