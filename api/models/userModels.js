const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

mongoose.exports = mongoose.model('User', UserSchema);
