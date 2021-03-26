//Import libraries
const express = require('express');
const { check, body } = require('express-validator/check');
const isAuth = require('../middleware/is-auth')

//Import models
const User = require('../models/user');

//Controller
const gameController = require('../controllers/game');

const router = express.Router();

router.post('/newGame', isAuth, gameController.postNewGame);
router.post('/loadGame', isAuth, gameController.postLoadGame);
router.patch('/saveGame', isAuth, gameController.postSaveGame);
module.exports = router;