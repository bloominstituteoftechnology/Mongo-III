const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const User = require('./userModels');

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: ObjectId,
    ref: User,
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
