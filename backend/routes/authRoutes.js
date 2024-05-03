// routes/auth.js
const express = require('express');
const router = express.Router();
const { login, signup, signout } = require('../controllers/authController');
const {buyMembership}=require('../controllers/purchaseMembership')
const {limiter}=require('../utils/loginAttemptLimiter');
const {userAuthticated}=require('../controllers/Authmiddleware')
const {expiryCheck}=require('../controllers/expiryChecker')



router.post('/login',limiter,login);

router.post('/signup',signup);

router.get('/profile',userAuthticated,expiryCheck,(req,res)=>{
    
    res.json(req.user)
   
})

router.post('/buy',userAuthticated,buyMembership)

router.get('/signout',signout);


module.exports = router;
