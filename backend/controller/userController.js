const jwt = require('jsonwebtoken')
//jwt da tr2ea ll authrezation azay bna5od header wda byba asm el algorithm aly ast5mdnha wbna5od el data f3ln mn el user aly hwa el id bta3o bngm3hom wn3mlhom 
//b3d ma gm3na el header w el id bn7ot 3lehom el password bt3na aly hwa hna abc123 fe file el env wbyt3mlhom kolhm encode bst5dam el password da 
//wb3den bb3t el token aly 3mlto genterate btr2ea de ll user wlma byb3to tani bb2a bfok el tkoen bl password aly mt5zn 3ndi ws3tha b3rf arg3halo wbrkd an hwa 
const bcrypt= require('bcryptjs')
const asyncHandler= require('express-async-handler')
const User = require('../models/userModel') 
//@desc Register new  user 
//@route POST /api/users
//@acsess Public
const registerUser =asyncHandler(async(req,res)=>{
    const {name, email, password}=req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if user exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User alerady exists')
    }


    //Hash password
    const salt = await bcrypt.genSalt(10) //salt is like random text imported to the password so it hard to decode for the hacker but the server try each valid salt he has on the pasword untill he finds the password+any one of the salts he tried
    const hashedPassword = await bcrypt.hash(password,salt)

    //create user
    const user= await User.create({
        name,
        email,
        password: hashedPassword
    })
    if(user){
        res.status(201).json({
           _id:user.id,
           name:user.name,
           email:user.email,
           token: generateToken(user._id)

        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
}) 
//@desc Authenticate a user 
//@route POST /api/users/login
//@acsess Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id:user.id,
             name:user.name,
             email:user.email,
             token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
}) 
//@desc Get user data 
//@route GET /api/users/me
//@acsess private
const getMe =asyncHandler(async(req,res)=>{
  res.status(200).json(req.user)
})  
//Generate Jwt
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}
module.exports={
    registerUser,
    loginUser,
    getMe,
}