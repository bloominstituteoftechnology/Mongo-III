const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments:[ {
    type: String,
  } ],
});

module.exports = mongoose.model('Post', postSchema);
