const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide username.']
    },
    password: {
        type: String,
        min: [6, 'Min 6 Characters.'],
        max: [18, 'Max 18 Characters.'],
    },
    createdOn: {
        type: String,
        required: true,
        default: new Date(),
    }
});

module.exports = mongoose.model('users', UserSchema);