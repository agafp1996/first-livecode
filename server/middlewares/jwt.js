const jwt = require('jsonwebtoken')

function jwtSign(object){
    return jwt.sign(object, 'secret')
}

function jwtVerify(token){
    return jwt.verify(token, 'secret')
}

module.exports = {
    jwtSign,
    jwtVerify
}