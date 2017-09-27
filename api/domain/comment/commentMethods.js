const Comment = require('./commentModel');

const commentNew = async comment => new Comment(comment)
  .save();

module.exports = {
  commentNew
};