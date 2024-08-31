// routes/auth.js
const express = require('express');
const router = express.Router();
const { login, signup, signout, passwordChange,generateOTP} = require('../controllers/authController');
const {buyMembership}=require('../controllers/purchaseMembership')
const {limiter,limiterOTP}=require('../utils/loginAttemptLimiter');
const {expiryCheck}=require('../controllers/expiryChecker')
const { userAuthticated, verifyOtp } = require('../middlewares/Authmiddleware');
require('dotenv').config();
router.post('/login',limiter,login);

router.post('/signup',limiterOTP,verifyOtp,signup);

router.get('/profile',userAuthticated,expiryCheck,(req,res)=>{
    
    res.json(req.user)
   
})

router.post('/buy',userAuthticated,buyMembership)

router.get('/signout',signout);


router.post('/generateotp',limiter,generateOTP );

router.put('/passwordChange',userAuthticated,passwordChange )
module.exports = router;
