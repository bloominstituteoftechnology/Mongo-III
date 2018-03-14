const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const User = require('./userModels');
const Comment = require('./commentModels');

const PostSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: User.username,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [
    {
      text: String,
      author: {
        type: ObjectId,
        ref: User.username,
      },
    },
  ],
});

module.exports = mongoose.model('Post', PostSchema);
