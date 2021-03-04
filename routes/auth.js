
//Import libraries
const express = require('express');
const { check, body } = require('express-validator/check');

//Import models
const User = require('../models/user');

const router = express.Router();

const authController = require('../controllers/auth');

router.post('/signin', authController.postSignIn);
router.post('/signup',
    check('email')
        .isEmail()
        .withMessage('Invalid Email')
        .custom((val, { req }) => {
            return User.findOne({ email: val })
                .then(userInf => {
                    if (userInf) {
                        return Promise.reject('Email already registered');
                    }
                });
        })
        .normalizeEmail()
    , authController.postSignUp);

module.exports = router;