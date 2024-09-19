import mongoose from "mongoose";
const {Schema,model} = mongoose

const adminSchema = new Schema({
    userName :{type:String,required:true,trim:true},
    email:{type:String,required:true,lowercase:true,unique:true},
    password:{type:String,required:true,minlength:8},
    

},{
    timestamps:true
})

const adminModel =  model("Admin",adminSchema)


const userSchema = new Schema({
    userName:{type:String,required:true,trim:true},
    email:{type:String,required:true,lowercase:true,unique:true},
    password:{type:String,required:true,minlength:8},
    purchasedCourse:[{type:Schema.Types.ObjectId,ref:'Course'}]
},{
    timestamps:true
})

const userModel = model("User",userSchema)

const courseSchema = new Schema({
    createdBy:{type:String,required:true},
    title:{type:String,required:true,trim:true},
    description:{type:String,required:true,trim:true},
    imageLink:{type:String,required:false},
    price:{type:Number,required:true},
    published:{type:Boolean,default:false},
    

},{
    timestamps:true
})

const courseModel = model("Course",courseSchema)

export {
    adminModel,
    userModel,
    courseModel
}