const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
  _parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  text: {
    type: String,
    required: true
  }
});

const PostSchema = new Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
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
	// comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
	comments: [CommentSchema]
})

module.exports = mongoose.model('Post', PostSchema);
module.exports = mongoose.model('Comment', CommentSchema);