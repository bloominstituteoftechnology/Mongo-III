const { commentNew } = require('../domain/comment/commentMethods');

const { validComment } = require('../validation/commentValidation');

const createComment = async (comment) => {
  const invalidComment = validComment(comment);
  if (!invalidComment) {
    const newComment = await commentNew(comment);
    return newComment;
  }
  return { error: { message: invalidComment } };
};


module.exports = {
  createComment
};