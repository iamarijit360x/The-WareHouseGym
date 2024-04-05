const mongoose=require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema=new mongoose.Schema({
    email:String,
    password:String,
})

const UserModel=mongoose.model("User",userSchema)
module.exports=UserModel