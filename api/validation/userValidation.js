const validate = require('validate.js');

const validEmailConstraint = {
  presence: true,
  email: true
};

const validPasswordConstraint = {
  presence: true
};

const validFirstNameConstraint = {
  presence: true
};

const validLastNameConstraint = {
  presence: true
};

const newUserConstraints = () => ({
  email: validEmailConstraint,
  password: validPasswordConstraint,
  firstName: validFirstNameConstraint,
  lastName: validLastNameConstraint
});

const loginUserConstraints = () => ({
  email: validEmailConstraint,
  password: validPasswordConstraint
});

module.exports = {
  validNewUser: user => validate(user, newUserConstraints()),
  validLoginUser: user => validate(user, loginUserConstraints())
};