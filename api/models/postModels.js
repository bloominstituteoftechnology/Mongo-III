const mongoose = require('mongoose');

const PostModel = new mongoose.Schema({
	author: {
		type: Schema.Types.ObjectId,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	comment: {
		type: Array
	}
});

const PostModel = mongoose.model('Post', PostSchema);
module.exports = Post;