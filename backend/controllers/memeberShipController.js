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
    console.log(m)
    if(data.length==0){
        for(var i=0;i<data.length;i++){
            let s=new Date(data[i].start_date)
            let e=new Date(data[i].end_date)
            if(start>=s && start<=e)
                return res.status(400).json({err:"Please the start date are conflict with other memeber for the same studente !!"})
        } 
        console.log("Hellow world")
        var m=await MemeberShip.create({
            student,cours,state,start_date,end_date,grad,attendance_percent,payment_status
        })   
    if(m)
        return res.json({message:"Memeber Ship added with success !!!"})
        return res.status(400).json({err:m})
    }else{
        return res.status(400).json({err:"Please this member ship is already exist !! "})
    }
}
exports.getData=async (req,res)=>{
const {Student,Cours,State,Grad,start_date,end_date,attendance,payment_state}=req.body
const searchQuery={}
    searchQuery.state={$regex:'.*'+State+'.*',$options:'i'}
    searchQuery.grad={$regex:'.*'+Grad+'.*',$options:'i'}
    searchQuery.start_date={$regex:'.*'+start_date+'.*',$options:'i'}
    searchQuery.end_date={$regex:'.*'+end_date+'.*',$options:'i'}
    searchQuery.payment_status={$regex:'.*'+payment_state+'.*',$options:'i'}
const data=await MemeberShip.find(searchQuery).select()
.populate([
    {path:'student',model:"User",select:["_id","first_name","last_name"],
        match:{$or:[
            {
            first_name:{$regex:'.*'+Student+'.*',$options:'i'},

            },
            {
            last_name:{$regex:'.*'+Student+'.*',$options:'i'},

            }
        ]}
    },
    {path:"cours",model:"Cours",select:["_id","name"],match:[{name:{$regex:'.*'+Cours+'.*',$options:'i'}}]}
])
if(data)
    return res.json({data})
return res.status(400).json({err:data})
}