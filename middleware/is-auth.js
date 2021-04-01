const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Checks if 'Authorization' is not null in header
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated');
        throw error;
    }

    // Decodes token and if token is authenticated, calls next() for next middleware
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        err.message = 'Token error';
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.id;
    next();
}
