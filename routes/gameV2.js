//Import libraries
const express = require('express');
const isAuth = require('../middleware/is-auth')

//Controller
const gameController = require('../controllers/gameV2');

const router = express.Router();

router.post('/newGameV2', gameController.postNewGame);

router.post('/loadGameV2',isAuth, gameController.postLoadGame);

router.post('/loadGameDataV2',isAuth, gameController.postLoadGameData);

router.patch('/saveGameV2',isAuth, gameController.postSaveGame);

router.delete('/deleteGameV2',isAuth, gameController.deleteGame);
module.exports = router;