const rateLimit = require('express-rate-limit');
exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5,
  handler:(req,res,err)=>{
    const resetTime = (req.rateLimit.resetTime - Date.now()) / 1000; // Convert milliseconds to seconds
    const remainingTime = Math.ceil(resetTime); 
    return res.status(429).json({message:"Too Many Attempts Please Try Again Later",loginDisabled:true,remainingTime:remainingTime})
  }
});