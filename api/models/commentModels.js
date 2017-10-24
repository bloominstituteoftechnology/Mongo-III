const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  _parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }
});

module.exports = mongoose.model("Comment", CommentSchema);
