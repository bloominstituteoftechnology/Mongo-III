const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = Mongoose.model('User', UserSchema);