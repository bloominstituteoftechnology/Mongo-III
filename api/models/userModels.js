const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

});

const userModel = mongoose.model('User', UserSchema);

module.exports = userModel;