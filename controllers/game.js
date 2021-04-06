//Maze generator
const Maze = require('../controllers/maze');

//Models
const User = require('../models/user');
const Game = require('../models/game');

//Constant values

const MAX_HEALTH = 200;
const PLAYER_EXPERIENCE = 0;
const PLAYER_LEVEL = 0;
const ENEMIES = 3;


exports.deleteGame = (req, res, next) => {
    const gameId = req.body.gameId;
    const userId = req.body.userId;

    User.findById(userId)
        .then(user => {
            const gameIndex = user.games.findIndex(item => gameId);
            user.games.splice(gameIndex, 1);
            return user.save();
        })
        .then(response => {
            Game.findByIdAndDelete(gameId);
            res.status(200).json({ message: 'Game deleted' });
        })
        .catch(err => {
            console.log(err)
            if (!gameId) {
                err.statusCode = 422;
                err.message = 'gameId missing in request body.';
            } else if (!userId) {
                err.statusCode = 422;
                err.message = 'userId missing in request body.';
            } else {
                err.statusCode = 500;
                err.message = 'Something went wrong deleting the game';
            }
            return next(err);
        })
}
exports.postNewGame = (req, res, next) => {
    // JSON body parameters
    const x = req.body.h;
    const y = req.body.w;
    const canvasH = req.body.cH;
    const canvasW = req.body.cW;

    //Maze object
    const maze = new Maze(x, y);

    //Game object
    const game = new Game({
        maze: maze.convert(),
        inventory: [],
        playerExperience: PLAYER_EXPERIENCE,
        playerLevel: PLAYER_LEVEL,
        playerPosition: playerPosition(canvasW, canvasH),
        playerHealth: MAX_HEALTH,
        playerMaxHealth: MAX_HEALTH,
        enemyList: populateEnemyList(canvasW, canvasH)
    });

    //JSON response (without saving the game)
    res.json(game);
};

exports.postLoadGame = (req, res, next) => {
    const gameId = req.body.gameId;
    Game.findById(gameId).then(maze => {
        res.json(maze);
    }).catch(err => {
        console.log(err);
        if (!gameId) {
            err.statusCode = 422;
            err.message = 'gameId missing in request body.';
        } else {
            err.statusCode = 500;
            err.message = 'Something went wrong loading the game';
        }
        return next(err);
    });
};

// returns player level and experience
exports.postLoadGameData = (req, res, next) => {
    const gameId = req.body.gameId;
    Game.findById(gameId).then(data => {
        const playerLevel = data.playerLevel;
        const playerExperience = data.playerExperience;
        res.json({
            playerLevel,
            playerExperience
        });
    }).catch(err => {
        console.log(err);
        if (!gameId) {
            err.statusCode = 422;
            err.message = 'gameId missing in request body.';
        } else {
            err.statusCode = 500;
            err.message = 'Something went wrong loading the game data';
        }
        return next(err);
    });
};

exports.postSaveGame = (req, res, next) => {
    const gameObj = req.body.game;
    const userId = req.body.userId;

    const gameId = gameObj._id || "";

    Game.countDocuments({ _id: gameId }, (err, count) => {
        if (count > 0) { // game exists so update game
            Game.findByIdAndUpdate(gameId, gameObj)
                .then(result => {
                    res.status(200).json({ message: 'Game saved', id: result._id });
                })
                .catch(err => {
                    err.statusCode = 500;
                    err.message = 'Error saving the game';
                    return next(err);
                })
        } else { // save game as new game
            const game = new Game(gameObj);
            let newGame;
            game.save()
                .then(result => {
                    newGame = result;
                    return User.findById(userId)
                })
                .then(user => {
                    if (!user.games) {
                        user.games = [];
                    }

                    user.games.push(newGame);
                    user.save();
                    res.status(200).json({ message: 'Game saved', id: newGame._id });
                })
                .catch(err => {

                    if (!userId) {
                        err.statusCode = 422;
                        err.message = 'playerId field missing in request body';
                    } else if (!gameObj) {
                        err.statusCode = 422;
                        err.message = 'game field missing in request body';
                    } else {
                        err.statusCode = 500;
                        err.message = 'Error saving the gamw';
                    }

                    return next(err);
                });
        }
    }).catch(err => {
        err.statusCode = 500;
        err.message = 'Error saving the game';
        return next(err);
    })
}

function populateEnemyList(canvasW, canvasH) {
    let w = canvasW;
    let h = canvasH;
    let numMonsters = ENEMIES;
    let enemyList = new Array();
    for (let i = 0; i < numMonsters; i++) {
        let x = Math.floor(Math.random() * w);
        let y = Math.floor(Math.random() * h);
        enemyList.push({
            pos: {
                x: x,
                y: y,
            }
        });
    }
    return enemyList;
}

function playerPosition(canvasW, canvasH) {
    return {
        x: Math.floor(Math.random() * canvasW),
        y: Math.floor(Math.random() * canvasH)
    };
}