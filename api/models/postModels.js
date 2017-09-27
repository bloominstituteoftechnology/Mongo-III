const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const CommentSchema = new Schema({
    texts: String,
    Author:{ 
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: [CommentSchema]
});

module.export('Post', postSchema);