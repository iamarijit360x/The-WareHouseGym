const mongoose=require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema=new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    age:Number,
    phone:String,
    email:{type:String,required:true},
    password:{type:String,required:true},
    membership:Date,
    memberShipStatus:Boolean
})

const UserModel=mongoose.model("User",userSchema)
module.exports=UserModel