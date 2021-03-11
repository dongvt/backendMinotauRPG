const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    maze: {
        type: Schema.Types.ObjectId,
        ref: 'Maze',
        required: true
    },
    items: [
        { type: String, required: false } // Update this when items have a better schema
    ],
    enemy: [
        {
            position: {
                type: Number,
                required: true
            },
            currentHealth: {
                type: Number,
                required: true
            },
            maxHealth: {
                type: Number,
                required: true
            },
            damage: {
                type: Number,
                required: true
            }
            // items dropped
        }
    ],
    player: {
        position: {
            type: Number,
            required: true
        },
        exp: {
            type: Number,
            required: true
        },
        health: {
            type: Number,
            required: true
        },
        max_health: {
            type: Number,
            required: true
        },
        current_level: {
            type: Number,
            required: true
        },
        items_equipped: [
            { type: String, required: false } // Update this when items have a better schema
        ]
    },
    droppedItems: {
        type: Array, // TODO array of items
        required: false
    }
});

module.exports = mongoose.model('Game', userSchema);