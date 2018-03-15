const mongoose = require('mongoose');
const User = require('./userModels.js');

const ObjectId = mongoose.Schema.Types.ObjectId;

const PostSchema = new mongoose.Schema({
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
  comments: [{ type: ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Post', PostSchema);