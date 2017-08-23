const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: 'String',
  author: {
    name: 'String',
    _id: 'String',
  },
  body: 'String',
  comments: {
    body: 'String',
    userName: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserName'}]
  },
});

module.exports = mongoose.model('Post', PostSchema);