const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: 'Untitled'
  },
  content: {
    type: String
  },
  comments: []
});

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;
