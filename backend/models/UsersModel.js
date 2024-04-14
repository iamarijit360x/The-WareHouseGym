const mongoose=require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema=new mongoose.Schema({
    firstname:String,
    lastname:String,
    age:Number,
    phone:String,
    email:String,
    password:String,
    membershipExpiry:Date
})

const UserModel=mongoose.model("User",userSchema)
module.exports=UserModel