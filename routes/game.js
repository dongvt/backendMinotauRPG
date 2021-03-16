//Import libraries
const express = require('express');
const { check, body } = require('express-validator/check');

//Import models
const User = require('../models/user');

//Controller
const gameController = require('../controllers/game');

const router = express.Router();

router.patch('/newGame',gameController.patchNewGame);
router.put('/loadGame',gameController.putLoadGame);
router.post('/saveGame', gameController.postSaveGame);
module.exports = router;