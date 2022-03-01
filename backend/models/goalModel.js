const mongoose=require('mongoose')

const goalSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId, // the type of the user is ID so thats how we  create it
        required: true,
        ref: 'User' //reference so we can know which user created the goal
    },
    text:{
        type:String,
        required: [true,'Please add a text value'],
    },
  },
    {
        timestamps : true,
    }
 
)
module.exports= mongoose.model('Goal',goalSchema)