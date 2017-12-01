const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    // todo: {
    //     text: {
    //         type: String,
    //         required: true,
    //     }
    // },
    // completed: {
    //     type: String,
    //     default: 'incomplete',
    //     enum: ['complete', 'incomplete', 'staged']
    // },
    password: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('User', UserSchema);
