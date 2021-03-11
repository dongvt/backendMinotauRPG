const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    maze: [{
        type: Object,
        require: true
    }],
    userIndex: {
        type: Number,
        require: true
    },
    enemyList: [{
        type: Object,
        require: true
    }]
});

module.exports = mongoose.model('Game', gameSchema);