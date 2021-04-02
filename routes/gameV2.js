//Import libraries
const express = require('express');
const isAuth = require('../middleware/is-auth')

//Controller
const gameController = require('../controllers/gameV2');

const router = express.Router();

router.post('/newGameV2',gameController.postNewGame);

router.post('/loadGameV2',gameController.postLoadGame);

router.patch('/saveGameV2', gameController.postSaveGame);

router.delete('/deleteGameV2',gameController.deleteGame);
module.exports = router;