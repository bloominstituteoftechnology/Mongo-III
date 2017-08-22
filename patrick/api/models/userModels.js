const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const model = mongoose.model;

// Clear out mongoose's model cache to allow --watch to work for tests:
// https://github.com/Automattic/mongoose/issues/1251
// mongoose.models = {};
// mongoose.modelSchemas = {};
//
// mongoose.Promise = Promise;
// mongoose.connect('mongodb://localhost/', { useMongoClient: true });

// {username: foo, password: bar}
// const UserSchema = new Schema({
const UserSchema = new mongoose.Schema({
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

// module.exports = model('Users', UserSchema);
module.exports = mongoose.model('User', UserSchema);
