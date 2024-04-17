// routes/auth.js
const express = require('express');
const router = express.Router();
const { login, signup, signout } = require('../controllers/authController');
const {limiter}=require('../utils/loginAttemptLimiter')

router.post('/login', limiter,login);

router.post('/signup',signup);

router.get('/profile',(req,res)=>{
    if(req.isAuthenticated())
    {console.log(req.user)
    res.json(req.user)}
    else
    {
        res.json({message:"Not Authnticated"})    }
})
router.get('/signout',signout);


module.exports = router;
