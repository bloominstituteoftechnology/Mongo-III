const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String
    }
});

module.exports = mongoose.model('Post', PostSchema);