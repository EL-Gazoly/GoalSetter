
const errorHandler=(err,req,res,next)=>{
    //if the status code isnt 400 (client entered bad data) then its an internal server error
    const statusCode=res.statusCode?res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: err.message,
        //stack shows more addtional information but we only want it if we are on the development mode
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
  
}  
module.exports={
        errorHandler,
    } 