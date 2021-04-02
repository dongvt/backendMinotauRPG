const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Start game at maze loacation x=0 and y=0. Increment or decriment the x and y as necessary
// as the player moves to different mazes.

const newGameSchema = new Schema({
    currentRoomX: {
        type: Number,
        require: true
    },
    currentRoomY: {
        type: Number,
        require: true
    },
    rooms: [{
        roomLocationX: {
            type: Number,
            require: true
        },
        roomLocationY: {
            type: Number,
            require: true
        },
        maze: [{
            type: Object,
            require: true
        }],
        enemyList: [{
            type: Object,
            require: true
        }]
    }],  
    ineventory: [{
        type: Object,
        require: true
    }],
    playerExperience: {
        type: Number,
        require: true
    },
    playerLevel: {
        type: Number,
        require: true
    },
    playerPosition: {
        type: Object,
        require: true
    },
    playerHealth: {
        type: Number,
        require: true
    },
    playerMaxHealth: {
        type: Number,
        require: true
    }  
});

module.exports = mongoose.model('GameV2', newGameSchema);