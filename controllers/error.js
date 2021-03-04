exports.get404 = (req,res,next) => {
    return res.json({
        status: 404,
        message: 'Invalid address'
    });
}