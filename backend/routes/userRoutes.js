const express=require("express");
const Router=express.Router()
const {signIng,login}=require("../controllers/userController")
Router.post("/signIng",signIng)
Router.post("/login",login)
module.exports=Router