const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  content: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
});

module.exports = mongoose.model("Post", postSchema);
