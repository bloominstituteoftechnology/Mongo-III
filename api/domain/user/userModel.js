const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { hashPassword } = require('../../utils/passwordHash');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  }
});

UserSchema.pre('save', async function(next) {
  try {
    const user = this;
    if (!user.isModified('password')) return next();
    user.password = await hashPassword(user.password);
    next();
  } catch (error) { 
    next(error) 
  }
});

module.exports = mongoose.model('User', UserSchema);