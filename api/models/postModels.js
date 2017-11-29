const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
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
    type: mongoose.Schema.Types.ObjectId
    ref: 'comment',
  }],
});

module.exports = mongoose.model('user', postSchema);