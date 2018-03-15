const mongoose = require('mongoose');
// const User = require('./UserModels.js') // Don't do it like this
const User = mongoose.model('User')

const ObjectId = mongoose.Schema.Types.ObjectId;

const PostSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [],
});

module.exports = mongoose.model('Post', PostSchema);
