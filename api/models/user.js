const mongoose = require('mongoose');
const { hashPass } = require('../helpers');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  user.password = await hashPass(user.password);
  next();
});

module.exports = mongoose.model('User', UserSchema);
