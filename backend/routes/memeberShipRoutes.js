const expres=require("express")
const Router=expres.Router()
const {auth}=require("../middleware/auth")
const {getInputData,submitData}=require("../controllers/memeberShipController")
Router.post("/getInputData",auth,getInputData)
Router.post("/submitData",auth,submitData)
module.exports=Router
