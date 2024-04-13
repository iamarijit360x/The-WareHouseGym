// routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { login, signup, signout } = require('../controllers/authController');


router.post('/login', login);

router.get('/signup', (req, res) => {
  res.send('signup');
});

router.post('/signup',signup);

router.get('/profile', (req, res) => {
  res.send('Sucesss');
});

router.get('/signout',signout);

module.exports = router;
