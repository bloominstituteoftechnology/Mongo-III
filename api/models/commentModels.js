const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  _parent: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  }
});

module.exports = mongoose.model("Comment", commentSchema);
