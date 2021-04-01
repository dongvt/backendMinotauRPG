
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator/check');

exports.postSignIn = (req,res,next) => {
    const email = req.body.email;
    const pass = req.body.password;

    console.log(req.body);

    User.findOne({email: email})
        .then(user => {
            if(!user) {
                const error = new Error('Invalid password or email');
                error.statusCode = 403;
                return next(error);
            }

            bcrypt.compare(pass, user.password)
            .then(matched => {
                if (matched) {
                    const token = jwt.sign({id: user._id.toString(), email: email}, process.env.JWT_SECRET, {expiresIn: '1h'});
                    user.password = '';
                    return res.status(200).json({
                        message: '',
                        user: user,
                        token: token
                    });
                }
                const error = new Error('Invalid password or email')
                error.statusCode = 403;
                return next(error);
            });
        })
        .catch (err => {
            err.statusCode = 403;
            err.message = 'User not found';
            return next(err);
            
        })
}

exports.postSignUp = (req,res,next) => {
    const email = req.body.email;
    const pass = req.body.password;
    const confPass = req.body.confirmPassword;
    const name = req.body.username;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.statusCode = 422;
        return next(error);
    }

    if (pass !== confPass) {
        const error = new Error('Passwords do not match');
        error.statusCode = 400;
        return next(error);
    }

    bcrypt.hash(pass,12)
        .then(hashedPassword => {
            const newUser = new User({
                username: name,
                password: hashedPassword,
                email: email
            });
            return newUser.save();
        })
        .then(result => {
            res.status(200).json({
                message: 'User Created',
            });
        }) 
        .catch(err => {
            err.statusCode = 403;
            err.message = 'Error saving password';
            return next(err);
        })

    
}