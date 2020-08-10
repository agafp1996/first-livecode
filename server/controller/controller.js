const {User, Food} = require('../models/index')

const {hashPassword, compareHash} = require('../middlewares/bcrypt')
const {jwtSign,jwtVerify} = require('../middlewares/jwt')

class rootController{
    static postRegisterHandler(req,res){

        const hashedPassword = hashPassword(req.body.password)
        console.log(hashedPassword)

        const payload = {
            email: req.body.email,
            password: hashedPassword
        }
        User.create(payload)
        .then((data)=>{
            res.status(201).json(data)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    }
    static postLoginHandler(req,res){
        User.findOne({
            where:{
                email: req.body.email
            }
        })
        .then((data)=>{
            compareHash(req.body.password, data.password)

            if (compareHash){
                let token = jwtSign({
                    id: data.id,
                    email:data.email
                })
                req.headers.access_token = token
                console.log(token)
                
                res.status(200).json({
                    id: data.id,
                    email:data.email,
                    message: "Login Successfull"
                })
            } else{
                res.status(401).json({
                    message: 'invalid username/password'
                })
            }
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    }
    static postFoodHandler(req,res){
        //console.log('masuk ke food nih')
        
        Food.create({
            title: req.body.title,
            price: req.body.price,
            ingredients: req.body.ingredients,
            tag: req.body.tag,
            UserId: req.currentUserId
        })
        .then((data)=>{
            res.status(201).json(data)
        })

    }
    static getFoodSpecificHandler(req, res){
        Food.findAll({
            where: {
                UserId : req.currentUserId
            }
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    }
    static deleteFoodHandler(req,res){
        Food.destroy({
            where:{
                id: req.params.id
            }
        })
        .then((data)=>{
            res.status(200).json({
                message: 'Successfully delete food from your menu'
            })
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    }

}

module.exports = rootController