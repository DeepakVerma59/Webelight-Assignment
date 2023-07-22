const Customer = require("../models/customers");
const hashPassword = require("../helpers/authHelper");
const comparePassword = require("../helpers/authHelper")

const registerController = async(req,res)=>{
    try{
     const {name,email,password, role} = req.body;
     if(!name){return res.send({error:"name is required"})}
     if(!email){return res.send({error:"email is required"})}
     if(!password){return res.send({error:"password is required"})}
     if(!role){return res.send({error:"role is required"})}
     
     //existing customer
     const existingCustomer = await Customer.findOne({email});
     if(existingCustomer){
        res.send({
            success:false,
            message:"customer already exist!! please login"
        })
     }
     //register
     const hashedPassword = await hashPassword(password)
     const customerRegister = await Customer.create({name,email,password:hashedPassword,role});
     res.status(200).send({
        success:true,
        message:"Customer registered successfully",
        customerRegister
     })
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"registration failed"
        })
    }
    }
    

    const loginController =async(req,res)=>{
        try{
        const {email,password} = req.body;
        if(!email || !password){
           return res.status(404).send({
            success:false,
            message:"invalid email or password"
           })
        }
        const loginCustomer = await Customer.findOne({email});
        if(!loginCustomer){
            return res.status(404).send({
                success:false,
                message:"email is not registered"
            })
        }
        const matchingPassword = await comparePassword(password,loginCustomer.password);
        if(!matchingPassword){
            return res.status(404).send({
                success:false,
                message:"invalid password"
            })
        }
        //generating token for the customer:
        const token = await jwt.sign({_id:loginCustomer.id},process.env.JWT_TOKEN,{expiresIn:"10d"});
         res.status(200).send({
            success:true,
            message:"login successful",
            token
         })
        }
        catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"invalid login"
        })
        }
        }

 module.exports = {registerController,loginController}