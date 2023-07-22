const Customer = require("../models/customers");
const jwt = require("jsonwebtoken");
const JWT_TOKEN = 'hellobrotherhowareyoudoingthisveryevening'

//Middleware to authenticate token

const authenticateToken = async(req,res,next)=>{
  try{
   const decode = jwt.verify(req.headers.authorization,JWT_TOKEN);
  
   req.user = decode
   console.log(req.user)
   next()
  }
  catch(err){
     console.log(err)
     res.status(500).send(err)
  }
 }
 
  

// // Middleware to check if the user has admin role
const isAdmin = async (req, res, next) => {
  const user = await Customer.findById(req.user._id)
  console.log(user)
  if (user.role != "admin") {
    return res.status(403).send({message: "You are not the admin"});
  }
  else{
  next()
  }
};


  module.exports = {authenticateToken, isAdmin}

