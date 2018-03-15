const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const PostSchema = mongoose.Schema({
    author: {
        type: ObjectId,
        ref: 'user',
    },
    title: {
        type: String,
        required: [true, 'Please provide title.'],
        min: [4, 'Min 4 Characters.'],
        max: [80, 'Max 80 Characters.'],
    },
    content: {
        type: String,
    },
    comments: {
        type: Array,
    },
    createdOn: {
        type: String,
        required: true,
        default: new Date(),
    }
});


module.exports = mongoose.model('posts', PostSchema);


