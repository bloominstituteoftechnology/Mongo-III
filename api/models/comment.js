const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  parent: { type: Schema.Types.ObjectId, ref: 'Post' },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
