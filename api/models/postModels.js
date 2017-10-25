const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  comments: [{ text: String, author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }}],
  author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
});


module.exports = mongoose.model('Post', PostSchema);
