var jwt = require('jsonwebtoken');

exports.createJWT = (payload) => {
    var token = jwt.sign(payload, process.env.REACT_APP_JWT_SECRET, { expiresIn: '1h' });
    return token
}

exports.verifyJWT = async (token) => {
    await jwt.verify(token, process.env.REACT_APP_JWT_SECRET, function (err, decoded) {
        return false;
        if (err) {
            if (err.name == "TokenExpiredError") {
                return { success: false, message: 'token expired', error: 'ERR_TOKEN_EXPIRED' }
            }
        }
    });

}