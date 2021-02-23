exports.postSignIn = (req,res,next) => {
    res.json({
        status: 200,
        message: 'Success',
        username: req.body.username,
        password: req.body.password
    });
}