const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

require('./userModels.js');

const PostSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [{
    text: {
      type: String,
      required: true
    },
    author: {
      type: ObjectId,
      ref: 'User'
    }
  }]
});

const postModel = mongoose.model('Post', PostSchema);

module.exports = postModel;