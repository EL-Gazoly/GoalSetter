const express = require('express')
const router = express.Router()
const {registerUser,loginUser,getMe} = require('../controller/userController')
const {protect}=require('../middelware/authMiddelware')
router.post('/',registerUser) 
router.post('/login',loginUser) 
router.get('/me',protect,getMe) 



module.exports= router  