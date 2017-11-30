const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  author : {
    type: mongoose.Schema.Types.ObjectId
  }, 
  title : {
    type: String,
    required: true
  },
  content : {
    type: String,
    required: true
  }, 
  comments : Array,
});

module.exports = mongoose.model('Post', PostSchema);