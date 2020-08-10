const express = require('express')

const router = express.Router()
const rootController = require('../controller/controller')

router.post('/register', rootController.postRegisterHandler)


module.exports = router