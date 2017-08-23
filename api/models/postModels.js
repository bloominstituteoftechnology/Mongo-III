const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: {
    type: String,
    required: true
  },
  comments: [{
    text: String,
    author: {
      type: String,
      ref: 'User'
    }
  }]
});

mongoose.exports = mongoose.model('Post', PostSchema);
