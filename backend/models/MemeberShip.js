const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema
const MemberShip=mongoose.Schema({
    student:{type:ObjectId,ref:"User",required:true},
    cours:{type:ObjectId,ref:"Cours",required:true},
    state:{type:String,required:true},
   
    start_date:{type:String,required:true},
    end_date:{type:String,required:true},
    
    grad:{type:String,required:true},
    attendance_percent :{type:String,required:true},
    payment_status:{type:String,required:true},

},{timestamps:true})
module.exports=mongoose.model("MemberShip",MemberShip)