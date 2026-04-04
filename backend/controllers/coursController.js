const User=require("../models/User")
const Cours=require("../models/Cours")
const formidable=require("formidable")
const fs=require("fs")
exports.submitData=async (req,res)=>{

    const form=new formidable.IncomingForm()
    form.keepExtensions=true
    form.parse(req,async (err,fields,files)=>{
        
        const {tags,name,price,rating,prof,description,state,_id}=fields
        if(_id){
                    if(!tags || !name || !price || !rating || !prof || !state || !description){
            return res.status(400).json({err:"Please all the fields required"})
        }
        var data=await Cours.find().select("-photo").and([{name},{_id:{$ne:_id}}])
        if(data.length!=0)
            return res.status(400).json({err:"Please the name is already exist !!"})
        const data_updated={tags,name,price,rating,prof,description,state}
        if(files.photo){
            data_updated.photo={
                data:fs.readFileSync(files.photo.path),
                contentType:files.photo.type
            }
        }
        data=await Cours.findOneAndUpdate(
            {_id},{$set:data_updated},{$new:true}
        )
        if(data)
            return res.json({message:"Updated with success "})
        return res.status(400).json({err:data})
        }else{

            if(!tags || !name || !price || !rating || !prof || !state || !description){
                return res.status(400).json({err:"Please all the fields required"})
            }
            if(!files.photo){
                return res.status(400).json({err:"Please the photo is required !!"})
            }
            var data=await Cours.find({name}).select("-photo")
            if(data.length!=0)
                return res.status(400).json({err:"Please the name is already exist !!"})
            data=await Cours.create({
                tags,name,price,rating,prof,description,state,photo:{
                    data:fs.readFileSync(files.photo.path),
                    contentType:files.photo.type
                }
            })
            if(data){
                return res.json({message:"Cours created with success !!"})
            }
        }
    })
}
exports.getData=async (req,res)=>{
    const {name,price,rating,state,tags,prof_first_name,prof_last_name,prof_phone,prof_email,description}=req.body
    const searchQuery={}
    searchQuery.name={$regex:'.*'+name+'.*',$options:'i'}
    searchQuery.price={$regex:'.*'+price+'.*',$options:'i'}
    searchQuery.rating={$regex:'.*'+rating+'.*',$options:'i'}
    searchQuery.state={$regex:'.*'+state+'.*',$options:'i'}
    searchQuery.tags={$regex:'.*'+tags+'.*',$options:'i'}
    searchQuery.description={$regex:'.*'+description+'.*',$options:'i'}
    const data=await Cours.find(searchQuery).select("-photo").populate([{
        path:"prof",
        model:"User",
        select:["_id","first_name","last_name","email","phone"],
        match:{
            first_name:{$regex:'.*'+prof_first_name+'.*',$options:'i'},
            last_name:{$regex:'.*'+prof_last_name+'.*',$options:'i'},
            phone:{$regex:'.*'+prof_phone+'.*',$options:'i'},
            email:{$regex:'.*'+prof_email+'.*',$options:'i'},
        }
    }])
    if(data)
        return res.json({data})
    return res.status(400).json({err:data})
}
exports.getPhoto=async (req,res)=>{
    const _id=req.params._id
    const c=await Cours.find({_id}).select()
    if(c){
        res.set('content-Type',c[0].photo.contentType)
        return res.send(c[0].photo.data)
    }
        
}
exports.deleteCours=async (req,res)=>{
    const _id=req.params._id
    const cours=await Cours.findOneAndDelete({_id})
    if(cours)
        return res.json({message:"Cours Deleted with success !!"})
        return res.status(400).json({err:cours})
}