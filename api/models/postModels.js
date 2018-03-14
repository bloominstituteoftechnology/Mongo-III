const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema ({
    author: {
        type: ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },

    comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});
 module.exports = mongoose.model('Post', PostSchema);

