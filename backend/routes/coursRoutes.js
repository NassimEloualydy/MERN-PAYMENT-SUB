const {auth}=require("../middleware/auth")
const express=require("express")
const router=express.Router()
const {submitData,getData,getPhoto}=require("../controllers/coursController")
router.post("/submitData",auth,submitData)
router.post("/getData",auth,getData);
router.get("/getPhoto/:_id",getPhoto)
module.exports=router