const express=require("express");
const Router=express.Router()
const {signIng,login,getData,getPhoto}=require("../controllers/userController")
Router.post("/signIng",signIng)
Router.post("/login",login)
Router.post("/getData",getData)
Router.get("/getPhoto/:_id",getPhoto)
module.exports=Router