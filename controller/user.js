import { userModel } from "../model/schemas.js";
import { passwordGenerator } from "./admin.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'




 const signUpUser = async(req,res) =>{
   try {
    const {userName,password,email} = req.body
    if(!userName || !password ||!email){
       return res.status(400).json({message:"Please provide all fields !"})
    }
     console.log(email)
     const isUserExist = await userModel.findOne({email})
     if(isUserExist){
       return  res.status(403).json({message:"User already exist !"})
     }
    const hashedPassword =  await passwordGenerator(password)
    const user =  await userModel.create({userName,email,password:hashedPassword})
    
    const token = jwt.sign({id:user.id},process.env.SECRET,{expiresIn:"5h"})
    return res.status(200).json({message:`User created Successfully ,${user.userName}`,token})
    
   } catch (error) {
    console.log(error)
     res.status(500).json({message:'Internal server Error'})
   }
 }


 const userSignIn = async(req,res) =>{
    try {
        const{userName,email,password} = req.body
        if(!userName||!email||!password){
           return res.status(400).json({message:'Please provide all fields !'})
        }
        const user =  await userModel.findOne({email})
        const isPasswordValid = bcrypt.compare(password,user.password)
        if(!isPasswordValid){
          return res.status(403).json({message:"Invalid credentials"})
        }

        const token = jwt.sign({id:user.id},process.env.SECRET,{expiresIn:"3h"})
        return res.status(200).json({message:`Successfully signedIn ,welcome ${user.userName}`,token})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
     
     
 }


 export {
    signUpUser,
    userSignIn

 }