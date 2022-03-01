const jwt=require('jsonwebtoken')
const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token
 // making sure that the header is holding a token 
 if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){// cause the token always starts with bearer because it hodling the token 
    try{
        //Get token from header
        
        token =req.headers.authorization.split(' ')[1] //we gonna split token when it finds a space cause it always like this (barer RestOFTheToken)then the barer is the first is the barer word  which is 0 and the second which is one is the real token 
 
        //verify token
        const decoded=jwt.verify(token, process.env.JWT_SECRET)// the first parmeter is the real token that we get from spliting the request header  and the second parmeter is the pasword used to decode the token
            //the jwt verify will allow us to take the payload that contins our data so we can call our id now 
        //Get user from token
        req.user=await User.findById(decoded.id).select('-password') //.selec('-password') we are saying that he reomve the hashed password from the payload
        next() 
    }catch(error){
        res.status(401)//means not authrized
        throw new Error('Not authorized')
    }
 } 
 if(!token){
     res.status(401)
     throw new Error('Not authorize, no token')
 }
})
module.exports={protect}