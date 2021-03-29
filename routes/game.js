//Import libraries
const express = require('express');
const isAuth = require('../middleware/is-auth')

//Controller
const gameController = require('../controllers/game');

const router = express.Router();

router.post('/newGame',gameController.postNewGame);

router.post('/loadGame',isAuth,gameController.postLoadGame);

router.patch('/saveGame',isAuth, gameController.postSaveGame);
module.exports = router;