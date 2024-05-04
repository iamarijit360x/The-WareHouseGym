const mongoose=require('mongoose');

const Otp=new mongoose.Schema({
    email:"string",
    otp:"string",
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '5m' 
      }
})

const OtpModel=mongoose.model("Otp",Otp)
module.exports=OtpModel