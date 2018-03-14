const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const CommentSchema = new mongoose.Schema({
  text: String,
  author: {
    type: ObjectId,
    ref: "User",
  },
});

const PostSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [CommentSchema],
});

module.exports = mongoose.model("Post", PostSchema);
