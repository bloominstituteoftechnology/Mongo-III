const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title : String,
    content : String,
    author : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments : []
});

module.exports = mongoose.model('Post', PostSchema);