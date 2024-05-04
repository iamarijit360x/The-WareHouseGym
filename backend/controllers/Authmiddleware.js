const Otp=require('../models/OtpModel')
exports.userAuthticated=function (req,res,next)
{
    if(req.isAuthenticated())
        next()
    else
        res.status(401).json({message:"Not Authnticated",authStatus:false})  
}

exports.verifyOtp= async (req,res,next)=>{
    const {otp,email}=req.body;
    const UserEmail=await Otp.findOne({email:email})
    console.log(UserEmail)
    if(UserEmail.otp===otp){
        await UserEmail.deleteOne()
        next()
    }
    else
        res.json({otpVerify:false})
}