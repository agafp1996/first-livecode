const express = require('express')

const router = express.Router()
const rootController = require('../controller/controller')
const {auth} = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')

router.post('/register', rootController.postRegisterHandler)
router.post('/login', rootController.postLoginHandler)
router.post('/foods', auth, rootController.postFoodHandler)
router.get('/foods', auth, rootController.getFoodSpecificHandler)
router.delete('/foods/:id', auth, authorization, rootController.deleteFoodHandler)


module.exports = router