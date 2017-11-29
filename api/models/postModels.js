const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
});

module.exports = mongoose.model('Post', PostSchema);