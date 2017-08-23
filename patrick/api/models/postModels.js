const mongoose = require('mongoose');

// const User = mongoose.model('../models/userModels');

// {
//   title: 'This is a fake blog post title',
//   author: {
//     name: 'Jen Urso'
//     _id: '2lkj3j23,
//   },
//   _id: '234lj23kjh',
//   content: 'This is some classy fake content',
//   comments: [
//     {text:'This is a class comment', author: 'Stanley Yelnats'},
//   ]
// }
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    name: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
    // _id: String,
  },
  // _id: String,
  content: {
    type: String,
    required: true,
  },
  comments: [
    {
      text: String,
      author: {
        type: String,
        default: 'Stanley Yelnats'
      }
    },
  ],
});

module.exports = mongoose.model('Post', PostSchema);
