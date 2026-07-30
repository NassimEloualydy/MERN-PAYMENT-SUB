const MemeberShip=require("../models/MemeberShip")
const Cours=require("../models/Cours")
const User=require("../models/User")
exports.getInputData= async (req,res)=>{
    
const data_cours=await Cours.find().select("-photo")
if(!data_cours)
    return res.status(400).json({err:data_cours})
const data_user=await User.find({role:"Student"}).select()
if(!data_user)

    return res.status(400).json({err:data_user})
return res.json({data_user,data_cours})
    
}
exports.submitData=async (req,res)=>{
    const {student,cours,state,start_date,end_date,grad,attendance_percent,payment_status}=req.body
    if(student=='' || cours=='' || state=='' || start_date=='' || end_date=='' || grad=='' || attendance_percent=='' || payment_status=='')
        return res.status(400).json({err:"Please all the fields are required !!"})
    const start=new Date(start_date)
    const end=new Date(end_date)
    if(end<=start)
        return res.status(400).json({err:"Please the end date must be bigger then the start date !!"})    
    const data=await MemeberShip.find({student,cours}).select()
    console.log9
    if(data.length==0){
    for(var i=0;i<data.length;i++){
        let s=new Date(data[i].start_date)
        let e=new Date(data[i].end_date)
        if(start>=s && start<=e)
            return res.status(400).json({err:"Please the start date are conflict with other memeber for the same studente !!"})
    } 
    var m=await MemeberShip.create({
    student,cours,state,start_date,end_date,grad,attendance_percent,payment_status
    })   

    if(m)
        return res.json({message:"Memeber Ship added with success !!!"})
        return res.status(400).json({err:m})
    }
}