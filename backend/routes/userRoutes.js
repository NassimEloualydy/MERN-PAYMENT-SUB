const express=require("express");
const Router=express.Router()
const {signIng,login,getData,getPhoto,deleteUser}=require("../controllers/userController")
const {auth}=require("../middleware/auth")
Router.post("/signIng",signIng)
Router.post("/login",login)
Router.post("/getData",getData)
Router.get("/getPhoto/:_id",getPhoto)
Router.post("/delete/:_id",auth,deleteUser)
module.exports=Router