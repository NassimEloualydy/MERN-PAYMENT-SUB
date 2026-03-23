const User=require("../models/User")
const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema
const coursSchema=mongoose.Schema({
    name:{type:String,required:true},
    price:{type:String,required:true},
    rating:{type:String,required:true},
    state:{type:String,required:true},
    tags:{type:String,required:true},
    prof:{type:ObjectId,ref:"User",required:true},
    photo:{data:Buffer,contentType:String},
    description:{type:String,required:true}
},{timestamps:true})
module.exports=mongoose.model("Cours",coursSchema)