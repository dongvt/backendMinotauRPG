const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    maze: [{
        type: Object,
        require: true
    }],
    playerHealth: {
        type: Number,
        require: true
    },
    playerExperience: {
        type: Number,
        require: true
    },
    playerPosition: [{
        type: Object,
        require: true
    }],
    enemyList: [{
        type: Object,
        require: true
    }],
    itemList: [{
        type: Object,
        require: true
    }],
});

module.exports = mongoose.model('Game', gameSchema);