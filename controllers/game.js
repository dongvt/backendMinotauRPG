//Maze generator
const Maze = require('../controllers/maze');

//Models
const User = require('../models/user');
const Game = require('../models/game');

exports.patchNewGame = (req,res,next) => {
    const x = req.body.h;
    const y = req.body.w;
    const userId = req.body.userId;
    const maze = new Maze(x,y);

    let newGame;
    const game = new Game({
        maze: maze.convert(),
        userIndex: 11, //To change, would be a random number from 0 to matrix.lengh - 1
        enemyList: [] //I asume is a list of numbers with the indexes of the position of each enemy
    });

    game.save()
    .then(result => {
        newGame = result;
        return User.findById(userId)
    })
    .then(user => {
        if (!user.games)
            user.games = [];
        
        user.games.push(newGame);
        user.save();
        res.json(newGame);
    })
    .catch(err => {
        console.log(err)
        res.json({status: 500, message:'Something went wrong saving the game'} );
    })
}