const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    validate: {
      validator: passwordLength,
      message: 'Password must be at least four characters long.',
    },
    required: true,
  },
});

function passwordLength(pass) {
  return pass.length >= 4;
}

module.exports = mongoose.model('User', UserSchema);
