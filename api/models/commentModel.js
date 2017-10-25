const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  text: {
    type: String,
  }
});
module.exports = mongoose.model('Comment', CommentSchema);