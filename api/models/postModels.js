const mongoose = require('mongoose');
const User = require('./userModels');

const ObjectId = mongoose.Schema.Types.ObjectId;

const PostSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: ObjectId,
    ref: 'User',
  },
  comments: [{ type: ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model('Post', PostSchema);