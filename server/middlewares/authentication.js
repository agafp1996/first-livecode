const {jwtVerify} = require('../middlewares/jwt.js')
const {User} =  require('../models/index')
const {compareHash} = require('../middlewares/bcrypt')

function auth(req,res,next){
    console.log('masuk sini auth')
    let valid = jwtVerify(req.headers.access_token)

    if (valid){
        User.findOne({
            where:{
                email: valid.email
            }
        })
        .then((data)=>{
            compareHash(data.password, req.headers.access_token)
            if (compareHash){
                req.currentUserId = data.id
                next()
            }
            else{
                res.status(401).json({
                    message: "Invalid Username/Password"
                })
            }
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    }
}

module.exports = {auth}