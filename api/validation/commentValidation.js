const validate = require('validate.js');

const validAuthorConstraint = {
  presence: true
};

const validTextConstraint = {
  presence: true
};

const validParentContraint = {
  presence: true
};

const commentConstraints = () => ({
  author: validAuthorConstraint,
  text: validTextConstraint,
  _parent: validParentContraint
});

module.exports = {
  validComment: comment => validate(comment, commentConstraints())
}