// routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { login, signup, signout } = require('../controllers/authController');
const {limiter}=require('../utils/loginAttemptLimiter')

router.post('/login', limiter,login);

router.post('/signup',signup);


router.get('/signout',signout);

module.exports = router;
