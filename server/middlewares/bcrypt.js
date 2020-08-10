let bcrypt = require('bcryptjs')

function hashPassword(password){
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

function compareHash(hash, password){
    return bcrypt.compareSync(password,hash)
}