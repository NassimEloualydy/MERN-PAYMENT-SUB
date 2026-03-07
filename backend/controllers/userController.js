const User=require("../models/User")
const formidable=require("formidable")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const bcrypt=require("bcryptjs")
const fs=require("fs")
// paypale 
const base="https://api-m.sandbox.paypal.com"
const CLIENT_ID="AZgVyHJWiHKBxCakivCo6f_RAYN_NLYF7Xdy56asejPJNSbwu8Kbi4xeZjhXIil8P3EfvAtuK2rih416"
const SECRETE_KEY="EE2tqL0icul0olXYWpjFWBR0gM1JuuuiT1MebjqFM3IT67IMaMps2WAMaRWfrQW0bQir_g7P93_brHUR"

 //generate token
 const genrate_access_token=async  ()=>{
  const auth=Buffer.from(`${CLIENT_ID}:${SECRETE_KEY}`).toString('base64');
  const response=await fetch(`${base}/v1/oauth2/token`,{
    method:"POST",
    body:"grant_type=client_credentials",
    headers:{
      Authorization:`Basic ${auth}`,
      'Content-Type':'application/x-www-form-urlencoded'
    }
  })
  if(response.ok){
    const jsoneData=await response.json()
    return jsoneData.access_token
  }else{
    console.log(response.text)
  }
 }
 //paypal
 const createOrder=async ()=>{
    const price=400
    const token=await genrate_access_token()
    const url=`${base}/v2/checkout/orders`
    const response=await fetch(url,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({
            intent:'CAPTURE',
            purchase_units:[{
                amount:{
                    currency_code:'USD',
                    value:price
                }
            }]
        })
    })
    if(response.ok){
        const msg=await response.json()
        console.log(msg)
    }

 }

exports.signIng=async (req,res)=>{
    // createOrder()
    // return 
    const form=new formidable.IncomingForm()
    form.keepExtensions=true
    form.parse(req,async (err,fields,files)=>{
        const {first_name,last_name,email,phone,password}=fields
    
        if(!first_name || !last_name || !email || !phone || !password)
            return res.status(400).json({err:"All the fields required !!"})
        var u=await User.find({first_name,last_name}).select("-photo")
        if(u.length!=0)
            return res.status(400).json({err:"The first name and the last name are exist already"})
        u=await User.find({email}).select("-photo")
        if(u.length!=0)
            return res.status(400).json({err:"Please the email is already exist !!"})
         u=await User.find({phone}).select("-photo")
        if(u.length!=0)
            return res.status(400).json({err:"Please the phone is already exist !!"})
        if(!files.photo){
            return res.status(400).json({err:"Please the photo is required !!"})
        }
        const salte=await bcrypt.genSalt(10)
        const hashed_pw=await bcrypt.hash(password,salte)  
        const user=await User.create({
            first_name,last_name,email,phone,role:"Admin",password:hashed_pw,photo:{
                data:fs.readFileSync(files.photo.path),
                contentType:files.photo.type
            }
        })
        if(user)
            return res.json({message:"Sign In with success !!"})
        return res.status(400).json({err:user})
    
    })
        
        
}
exports.login=async (req,res)=>{
    const {email,pw}=req.body
    if(!email || !pw){
        return res.status(400).json({error:"Please all the fields are required !!"})
    }
    const data=await User.find({email}).select("-photo")
    if(data.length!=1)
        return res.status(400).json({error:"Please the email not found !!"})
    const hashed_pw=data[0].password
    const is_matched=await bcrypt.compare(pw,hashed_pw)
    if(!is_matched)
        return res.status(400).json({error:"The password is wrong !!"})
}