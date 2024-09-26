import { adminModel,courseModel } from "../model/schemas.js";


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
       return res.status(400).json({message:"Please provide all fields"})
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


// ('/admin/courses').post()
 
  const addCourse = async(req,res) =>{
     try {
         const  courseImage = req.file
         if(!courseImage){
            return res.status(400).json({message:"No course Image found !"})
         }

         
        const {title,description,price,published} = req.body
        if(!title||!description||!price||!published){
            res.status(400).json({message:"Please provide all reqquired fields!"})
        }
         const createdBy = req.user 
         const imageLink= courseImage.filename
          
         const courseData = {
            createdBy,
            title,
            description,
            imageLink,
            price,
            published }

         const course = await courseModel.create(courseData)
         return res.status(200).json({message:"Course created Successfully ",course})


        
     } catch (error) {
        console.log(error)
        res.status(500).json({message:"Course Created Successfully !"})
     }
  }
  

   //'/admin/courses/:courseId').put()
   const updateCourse = async(req,res) =>{
          try {
           const courseId = req.params.courseId
           
           if(!courseId){
            res.status(400).json({message:"No courseId find on params !"})
           }

            const course =  await courseModel.findById(courseId)
            if(!course){
               return res.status(404).json({message:"No course found"})
            }
             let updateCourseField = {};

              const courseImage = req.file
              const{title,description,price,published} = req.body
               updateCourseField ={
                title:title !== undefined ? title : course.title,
                description:description !== undefined ? description :course.description,
                price:price !== undefined ? price : course.price,
                published:published !== undefined ? published : course.published
               }
                if(courseImage){
                    updateCourseField.imageLink = courseImage.filename
                }
               console.log(updateCourseField)
            
            const newCourse = await courseModel.findByIdAndUpdate(courseId,{$set : updateCourseField},{new:true})
            console.log(newCourse)
            return res.status(200).json({message:"Course updated successfully !",newCourse})
              
          } catch (error) {
             console.log(error)
             return res.status(500).json({message:"Internal Server Error"})
          }
   }

     const getCoursesCreatedByAdmin = async(req,res) =>{
        try {
            const createdBy = req.user
            const courses =  await courseModel.find({createdBy})
            if(courses.length === 0){
                return res.status(403).json({message:"No courses found !"})
            }
            return res.status(200).json({message:`courses created by ${createdBy}`,courses})
        } catch (error) {
               console.log(error)
               res.status(500).json({message:"Internal server Error"})
        }
     }

    //  ('/admin/courses/:courseId')
     const deleteCourse = async(req,res) =>{
            try {
              const courseId = req.params.courseId
                if(!courseId){
                    return res.status(400).json({message:"No courseId find on params"})
                }
                 await courseModel.findByIdAndDelete(courseId)
                 return res.status(200).json({message:"Course deleted Successfully"})
            } catch (error) {
                console.log(error)
                res.status(500).json({message:"Internal Server Error"})
            }
     } 


     const getMe = async(req,res) =>{
         try {
           const admin =  await adminModel.findById(req.user).select("-password")
           return res.status(200).json({admin})
         } catch (error) {
            console.log(error)
            res.status(500).json({message:"Internal Server Error"})
         }
     }

export{
    signUpAdmin,
    signInAdmin,
    passwordGenerator,
    addCourse,
    updateCourse,
    getCoursesCreatedByAdmin,
    deleteCourse,
    getMe
}