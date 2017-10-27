const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [CommentSchema],
});

module.exports = mongoose.model('Post', PostSchema);
