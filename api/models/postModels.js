const Mongoose = require('mongoose');

const PostSchema = new Mongoose.Schema({
    author: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    comments: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

const CommentSchema = new Mongoose.Schema({
    author: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true,
    }
});

const Post = Mongoose.model('Post', PostSchema);
const Comment = Mongoose.model('Comment', CommentSchema);
module.exports = { Post, Comment };