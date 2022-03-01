const asyncHandler =require ('express-async-handler') //useing it to use our error handler which we created insted of try catch
const { reset } = require('nodemon')

const  Goal = require('../models/goalModel')
const User = require('../models/userModel')
//@desc Get goals 
//@route GET /api/goals
//@acsess Private
const getGoals= asyncHandler(async(req,res) =>{
    const goals = await Goal.find({user: req.user.id})

    res.status(200).json(goals)
})
//@desc post goals 
//@route POST /api/goals
//@acsess Private
const setGoals= asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user:req.user.id
    })
    res.status(201).json(goal)
})
//@desc update goal
//@route PUT /api/goals/:id
//@acsess Private
const updateGoals= asyncHandler(async (req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    if(!req.user){
        res.status(401)
        throw new Error('Usr not found')
    }
    //Mske sure the logged in user matches the goal user
    if(goal.user.toString()!==req.user.id){
         reset.status(401)
         throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{new: true})
    res.status(200).json(updatedGoal)

})
//@desc Delete goal 
//@route DELETE /api/goals
//@acsess Private
const deleteGoals= asyncHandler (async (req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    
     
    if(!req.user){
        res.status(401)
        throw new Error('Usr not found')
    }
    //Mske sure the logged in user matches the goal user
    if(goal.user.toString()!==req.user.id){
         reset.status(401)
         throw new Error('User not authorized')
    }
    await goal.remove()

    res.status(200).json({id: req.params.id})
})




module.exports={
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals


}