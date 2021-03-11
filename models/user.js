const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    saveFile1: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        required: false
    },
    saveFile2: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        required: false
    },
    saveFile3: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);
