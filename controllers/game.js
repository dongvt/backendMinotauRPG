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
    console.log(gameId);
    Game.findById(gameId).then(maze => {
        res.json(maze);
    }).catch(err => {
        console.log(err);
        res.json({ status: 500, message: 'Something went wrong loading the game' });
    });
}

exports.postSaveGame = (req, res, next) => {
    const game = req.body.game;
    const userId = req.body.userId;

    Game.countDocuments({ _id: game._id }, (err, count) => {
        if (count > 0) { // game exists so update game
            Game.findByIdAndUpdate(game)
            .then(result => {
                res.json({ status: 200, message: 'Game saved' });
            }).catch(err => {
                console.log(err);
                res.json({ status: 500, message: 'Something went wrong saving the game' });
            })
        } else { // save game as new game
            const game = new Game(game);
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
                    res.json({ status: 200, message: 'Game saved', id: newGame._id });
                })
                .catch(err => {
                    console.log(err)
                    if (!userId) {
                        res.json({ status: 500, message: 'playerId field is missing' });
                    } else {
                        res.json({ status: 500, message: 'Something went wrong saving the game' });
                    }
                });
        }
    }).catch(err => {
        res.json({ status: 500, message: 'Something went wrong saving the game' });
    })
}

function populateEnemyList(canvasW, canvasH) {
    let w = canvasW;
    let h = canvasH;
    let numMonsters = ENEMIES; 
    let enemyList = new Array();
    for (let i = 0; i < numMonsters; i++)
    {
        let x = Math.random(0,w);
        let y = Math.random(0,h);
        enemyList.push({
            x: x,
            y: y,
        });
    }
    return enemyList;
}

function playerPosition(canvasW, canvasH) {
    return {
        x: Math.random(0, canvasW),
        y: Math.random(0, canvasH)
    };
}