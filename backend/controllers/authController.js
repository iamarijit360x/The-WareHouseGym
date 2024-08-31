const passport=require("passport")
const User=require('../models/UsersModel')
const Otp=require('../models/OtpModel')
const {hashPassword}=require('../utils/passWordHash')
const generateOTP = require("../utils/randomGen")
const sendEmail=require("../utils/emailSender")
const { otpByMail } = require("../EmailTemplates/otpEmailTemplate")
exports.signup=async (req,res)=>{
    const {firstname,lastname,email,password}=req.body
   try{ 
        const enPass=await hashPassword(password);
        const newUser=new User({firstname:firstname,lastname:lastname,email:email,password:enPass})
        await newUser.save();
        return res.json({"success":true})
        }
    catch (error) {
        console.error("Error occurred during signup:", error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

 


exports.login = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        if (!user) {
            return res.status(401).json(info);
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
            return res.json({ success: true, message: 'Login successful', user });
        });
    })(req, res, next);
};


exports.signout=(req,res)=>{
    req.logout((err)=>{
        if(err)
            console.log(err)
        res.end()
    });
}

exports.generateOTP=async (req,res)=>{
        const email=req.body.email
        console.log(email)
        const exists= await User.findOne({email:email})
        if(exists){
            return res.status(403).json({userExists:"True",message:"User Already Exists"})
        }
         
        const otp=generateOTP();
       
    
         const otpObject=new Otp({otp:otp,email:email})
         try {
            // Find and delete the OTP document where the email matches the specified value
            await Otp.findOneAndDelete({ email: email });
          } catch (error) {
            console.error('Error deleting OTP:', error);
          }
          
         await otpObject.save();
         const mailOptions = {
            to: email,
            subject: 'The Warehouse Gym OTP',
            html:otpByMail(otp)
          };
        
          try {
            await sendEmail(mailOptions); 
            res.json({otpGenration:true});
          } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({otp:otp,message:'Error sending email'});
          }
    
          
    }

exports.passwordChange=async (req,res,next)=>{
    try
      {const {password}=req.body
      const enPass= await hashPassword(password)
      const user= await User.findOneAndUpdate({email:req.user.email},{password:enPass})
      res.json({success:true})
    }
    catch(err){
      res.status(501).json({sucess:false})
    }
      
  }