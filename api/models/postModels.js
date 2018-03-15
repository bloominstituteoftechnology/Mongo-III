const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

});

const postModel = mongoose.model('Post', PostSchema);

module.exports = postModel;