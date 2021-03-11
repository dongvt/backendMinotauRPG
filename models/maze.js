const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mazeSchema = new Schema({
    username: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Maze', userSchema);
