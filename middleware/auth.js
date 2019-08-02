const jwt = require('jsonwebtoken');

const authMiddleware = function(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    const bearer = token.split(' ');

    jwt.verify(bearer[1], process.env.SECRET_KEY, (err, decoded) => {
       if (err) {
           res.status(401).json({
               message: err.message
           });
       } else {
           req.decoded = decoded;
           next();
       }
    });
};

module.exports = authMiddleware;