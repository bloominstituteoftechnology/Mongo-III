const mongoose = require('mongoose');
const User = require('../models/userModels');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User' 
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  likes: {
    type: Number,
    default: 0
  }
});

const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User' 
  },
  title: {
    type: String,
    required: true
  },
  content: {
      type: String,
      required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  comments: [commentSchema]
});


module.exports = mongoose.model('Post', postSchema);