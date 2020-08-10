let bcrypt = require('bcryptjs')

function hashPassword(password){
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

function compareHash(password, hash){
    return bcrypt.compareSync(password,hash)
}

module.exports = {
    hashPassword,
    compareHash
}