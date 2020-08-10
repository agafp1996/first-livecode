const {Food} =  require('../models/index')
function authorization(req,res,next){

    Food.findOne({
        where:{
            id: req.params.id
        }
    })
    .then((data)=>{
        if (data.UserId === req.currentUserId){
            next()
        } else{
            res.status(401).json({
                message: "unauthorized action"
            })
        }
    })


}

module.exports = {authorization}