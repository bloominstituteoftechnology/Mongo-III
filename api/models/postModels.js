const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.models = {};
mongoose.modelSchema = {};

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/', { useMongoClient: true });

const PostSchema = new Schema({
  title: {
  type: String,
  required: true
  },
  author: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  content: {
    type: String,
    required: true
  },
  comments: [
    { text: String, author: String }
  ]
})

module.export = mongoose.model('Posts', PostSchema);