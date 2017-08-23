const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  parentPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }
})

const PostSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  comments: [CommentSchema],
  // comments: [{
  //   text: String,
  //   author: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  // }]
});

const Post = mongoose.model('Post', PostSchema);
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = {
  Post,
  Comment,
}
