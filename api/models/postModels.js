const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostModelSchema = new Schema({
  title: {
    type: String
  },
  author: [{
    name: String,
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  // _id: Schema.Types.ObjectId,
  content: String,
  comments: [{ 
    text: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  }]
});

module.exports = mongoose.model('Post', PostModelSchema);
