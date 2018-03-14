const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const User = require('./userModels');
const Comment = require('./commentModels');

const PostSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: User,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    validate: {
      validator: passwordLength,
      message: 'Password must be at least four characters long.',
    },
    required: true,
  },
  comments: [
    {
      type: ObjectId,
      ref: Comment,
    },
  ],
});

module.exports = mongoose.model('Post', PostSchema);
