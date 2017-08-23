const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: 'String',
  author: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  content: 'String',
  comments: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Post', PostSchema);