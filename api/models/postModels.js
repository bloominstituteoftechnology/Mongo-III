const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: { mongoose.Schema.Types.ObjectId },
  content: {
    type: String,
    required: true
  },
  comments: [{
    text: String,
    author: String
  }]
});

mongoose.exports = mongoose.model('Post', PostSchema);
