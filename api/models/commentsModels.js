const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsModel = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
});

module.exports = mongoose.model('Comments', CommentsModel);
