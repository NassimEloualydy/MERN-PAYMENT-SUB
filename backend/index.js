const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
require("dotenv").config()
const app=express()
app.use(express.json())
app.use(cors())

const userRoutes=require("./routes/userRoutes")
app.use("/API/user",userRoutes)
const PORT=process.env.PORT || 5000
const DATABASE=process.env.DATABASE
mongoose.connect(DATABASE).then(()=>{
    console.log(`Database connected`)
}).catch(err=>{
    console.log(err)
})
app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`)
})
