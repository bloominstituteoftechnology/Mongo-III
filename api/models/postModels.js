const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
	comments: {
		type: Array
	}
});

module.exports = mongoose.model('Post', PostModel);