const Otp=require('../models/OtpModel')
exports.userAuthticated=function (req,res,next)
{
    if(req.isAuthenticated())
        next()
    else
        res.status(401).json({message:"Not Authnticated",authStatus:false})  
}

exports.verifyOtp= async (req,res,next)=>{
    try{
    const {otp,email}=req.body;
    const UserEmail=await Otp.findOne({email:email})
    if(UserEmail.otp===otp){
        await UserEmail.deleteOne()
        next()
    }
    else
        res.json({otpVerify:false})
    }
    catch(err){
        console.error("Error occurred during signup:", error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}