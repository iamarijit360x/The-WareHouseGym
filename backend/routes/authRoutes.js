// routes/auth.js
const express = require('express');
const router = express.Router();
const { login, signup, signout } = require('../controllers/authController');
const {buyMembership}=require('../controllers/purchaseMembership')
const {limiter,limiterOTP}=require('../utils/loginAttemptLimiter');
const {userAuthticated,verifyOtp}=require('../controllers/Authmiddleware')
const {expiryCheck}=require('../controllers/expiryChecker')
const {emailController}=require('../controllers/emailController')
const generateOTP=require('../utils/randomGen')
const sendEmail=require('../utils/emailSender')
const Otp=require('../models/OtpModel')
const User=require('../models/UsersModel')


router.post('/login',limiter,login);

router.post('/signup',limiterOTP,verifyOtp,signup);

router.get('/profile',userAuthticated,expiryCheck,(req,res)=>{
    
    res.json(req.user)
   
})

router.post('/buy',userAuthticated,buyMembership)

router.get('/signout',signout);


router.post('/generateotp',limiter, async (req,res)=>{
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
       // console.log('OTP deleted successfully');
      } catch (error) {
        console.error('Error deleting OTP:', error);
      }
      
     await otpObject.save();

     const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'The Warehouse Gym OTP',
        html: `<p>Dear Sir/Ma'am,</p>
        <p>You have requested a one-time password (OTP) to access your Warehouse Gym account. Please find your OTP below:</p>
        <p><strong>OTP: ${otp}</strong></p>
        <p>This OTP is valid for a single use and will expire shortly. Please do not share this OTP with anyone for security reasons. If you did not request this OTP, please disregard this email.</p>
        <p>Thank you for choosing Warehouse Gym.</p>
        <p>Best regards,<br/>The Warehouse Gym Team</p>`
      };
    
      try {
        await sendEmail(mailOptions); 
        res.json({otpGenration:true});
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({otp:otp,message:'Error sending email'});
      }

      
});

module.exports = router;
