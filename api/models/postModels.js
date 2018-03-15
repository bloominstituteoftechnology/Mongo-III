const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const PostSchema = mongoose.Schema({
    author: {
        type: ObjectId,
        ref: 'users',
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
    comments: [
        {
            text: String,
            author: {
                type: ObjectId,
                ref: 'users',
            },
        },
    ],
    createdOn: {
        type: String,
        required: true,
        default: new Date(),
    }
});


module.exports = mongoose.model('posts', PostSchema);


