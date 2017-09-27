const validate = require('validate.js');

const validAuthorConstraint = {
  presence: true
};

const validTitleConstraint = {
  presence: true
};

const validContentConstraint = {
  presence: true
};

const postConstraints = () => ({
  author: validAuthorConstraint,
  title: validTitleConstraint,
  content: validContentConstraint
});

module.exports = {
  validPost: post => validate(post, postConstraints())
};