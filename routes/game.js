//Import libraries
const express = require('express');
const { check, body } = require('express-validator/check');

//Import models
const User = require('../models/user');

//Controller
const gameController = require('../controllers/game');

const router = express.Router();

router.post('/newGame',gameController.postNewGame);

router.post('/loadGame',gameController.postLoadGame);

router.patch('/saveGame', gameController.postSaveGame);
module.exports = router;