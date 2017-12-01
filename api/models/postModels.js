const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    text: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const PostSchema = new Schema({
    title:{
        String, 
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [CommentSchema]
});

module.exports = mongoose.model('Post', PostSchema);