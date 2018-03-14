const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema ({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: ObjectId,
        ref: 'User',
    }
    _id: {
        type: ObjectId,
        ref: 'Post',
    }

});
module.exports = mongoose.model('Comment', commentSchema);
