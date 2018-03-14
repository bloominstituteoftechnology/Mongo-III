const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostModel = new mongoose.Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: "Comments"
	}]
});

module.exports = mongoose.model('Post', PostModel);