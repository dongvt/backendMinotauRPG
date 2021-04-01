exports.get404 = (req,res,next) => {
    return res.json({
        status: 404,
        message: 'Invalid address'
    });
}

exports.get500 = (req,res,next) => {
    return res.status(req.query.status).json({
        message: req.query.message
    });
}