import { adminModel } from "../model/schemas.js";

import bcrypt, { genSalt, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'


 const passwordGenerator = async (password) =>{
      if(!password){
        console.log("No passwordfound")
      }
      const saltRound = 10
      const salt = await genSalt(saltRound)
      return await hash(password,salt)
 }


const signUpAdmin = async(req,res) =>{
    try {
     const {userName,password,email} = req.body
     console.log(req.body)
     if(!userName||!password||!email){
        res.status(400).json({message:"Please provide all fields"})
     }
     const existing =  await adminModel.findOne({email})
      if(existing){
         return res.status(403).json({message:'Admin already exist !'})
         }
     
     const hashedPassword = await  passwordGenerator(password)
      const admin = await adminModel.create({userName,password:hashedPassword,email})
      console.log(admin)
      
     const token = jwt.sign({id:admin.id},process.env.SECRET,{expiresIn:'5h'})
     
     
    return res.status(200).json({message:"Admin created Successfully",token})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
}


const signInAdmin = async(req,res) =>{
     try {
         const {userName,password,email} = req.body
         if(!userName || !password ||!email){
            return res.status(400).json({message:"Please provide all fields"})
         }
          const admin = await adminModel.findOne({email})
          if(!admin){
            return res.status(403).json({message:"No admin found !"})
          }
         const isPasswordValid= bcrypt.compare(password,admin.password)
         if(!isPasswordValid){
            return res.status(400).json({message:"Invalid credentials"})
         }
         
          const token = jwt.sign({id:admin.id},process.env.SECRET,{expiresIn:"5h"})
         
         return res.status(200).json({message:"Succesfully signedIn",token})

     } catch (error) {
         console.log(error)
         res.status(500).json({message:"Internal srver error"})
     }
}

  
export{
    signUpAdmin,
    signInAdmin,
    passwordGenerator
}