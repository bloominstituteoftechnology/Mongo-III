const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const User = require('./userModels');
const Comment = require('./commentModels');

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
  comments: [
    {
      text: String,
      author: {
        type: ObjectId,
        ref: 'User',
      },
    },
  ],
});

module.exports = mongoose.model('Post', PostSchema);
