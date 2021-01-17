const jwt = require("jsonwebtoken");

/**
 * Generate access token
 * @param userId 
 */
module.exports.generateAccessToken = (userId) => {
    return jwt.sign({userId: userId}, process.env.TOKEN_SECRET || 'secretsecretsecret', { expiresIn: process.env.TOKEN_TIMEOUT });
}

/**
 * Retrun user id from token
 * @param token 
 * @returns 0 = error
 */
module.exports.getTokenValue = (authHeader) => {
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null){
        return 0
    }
    try {
        const decode = jwt.verify(token, process.env.TOKEN_SECRET || 'secretsecretsecret');
        return decode.userId
    } catch (error) {
        console.error(error);
        return 0
    }
}