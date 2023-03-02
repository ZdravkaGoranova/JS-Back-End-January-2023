const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'name should be at least two characters!'],
        required: [true, 'name is required!'],

    },
    image: {
        type: String,
        required: [true, 'image is required!'],
        match: [/^http[s]?:\/\//, 'Invalid URL']

    },
    age: {
        type: Number,
        required: [true, 'age is required!'],
        min: 1,
        max: 100,


    },
    description: {
        type: String,
        minLength: [5, 'description should be at least two characters!'],
        maxLength: [50, 'description should be at least two characters!'],
        required: [true, 'description is required!'],
    },

    location: {
        type: String,
        required: [true, 'location is required!'],
        minLength: [5, 'location should be at least two characters!'],
        maxLength: [50, 'location should be at least two characters!'],

    },
    commentList: [{
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        comment: {
            type: String
        }
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

});


const Photo = mongoose.model(' Photo', bookSchema);

module.exports = Photo;