const {User} = require('../models/index')

class rootController{
    static postRegisterHandler(req,res){
        const payload = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(payload)
        .then((data)=>{
            res.status(201).json(data)
        })
        .catch((err)=>{
            res.status(500)
        })
    }

}

module.exports = rootController