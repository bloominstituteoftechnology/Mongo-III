const mongoose = require('mongoose');

const PostModelSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author: [{
        name: String,
        _id: Schema.Types.ObjectId,
    }],
    _id: Schema.Types.ObjectId,
    content: String,
    comments: [{ text: String, author: String }]
});

module.exports = mongoose.model('Post', PostModelSchema);
