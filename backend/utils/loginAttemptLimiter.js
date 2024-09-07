const rateLimit = require('express-rate-limit');
const Otp=require('../models/OtpModel')
exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10,
  handler:(req,res,err)=>{
    const resetTime = (req.rateLimit.resetTime - Date.now()) / 1000; // Convert milliseconds to seconds
    const remainingTime = Math.ceil(resetTime); 

    return res.status(429).json({message:"Too Many Attempts Please Try Again Later",loginDisabled:true,remainingTime:remainingTime})
  }
});

exports.limiterOTP = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5,
  handler: async (req, res, err) => {
    try {
      if (err) {
        console.error('Error in rate limiting middleware:', err);
      }
      const resetTime = (req.rateLimit.resetTime - Date.now()) / 1000; // Convert milliseconds to seconds
      const remainingTime = Math.ceil(resetTime); 
      await Otp.findOneAndDelete({ email: req.body.email });
      return res.status(429).json({ message: "Too Many Attempts Please Try Again Later", loginDisabled: true, remainingTime: remainingTime });
    } catch (error) {
      console.error('Error in limiterOTP handler:', error);
      return res.status(500).json({ message: "Internal Server Error" }); // Return a generic error response
    }
  }
});
