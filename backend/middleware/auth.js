const jwt=require("jsonwebtoken")
require("dotenv").config()
exports.auth=async (req,res,next)=>{
    const auth_token=req.headers?.authorization
    if(!auth_token)
        return res.status(400).json({err:"Unauthorized Request"})
    const token=auth_token.split(" ")[1]
    const JWT_SECRETE=process.env.JWT_SECRETE
    
    const data=await jwt.verify(token,JWT_SECRETE)
    if(data.user){
        req.user=data.user
        next()
    }
    if(!data)
        return res.status(400).json({err:data})
}