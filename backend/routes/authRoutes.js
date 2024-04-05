// routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login Page</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
          }
  
          .container {
              background-color: #fff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              width: 300px;
          }
  
          h2 {
              text-align: center;
          }
  
          .form-group {
              margin-bottom: 20px;
          }
  
          .form-group label {
              display: block;
              margin-bottom: 5px;
          }
  
          .form-group input {
              width: 100%;
              padding: 8px;
              border: 1px solid #ccc;
              border-radius: 4px;
          }
  
          .btn {
              background-color: #4CAF50;
              color: white;
              padding: 10px 20px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              width: 100%;
          }
  
          .btn:hover {
              background-color: #45a049;
          }
      </style>
  </head>
  <body>
  
  <div class="container">
      <h2>Login</h2>
      <form id="loginForm" action="/login" method="post">
          <div class="form-group">
              <label for="email">email:</label>
              <input type="text" id="email" name="email" required>
          </div>
          <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required>
          </div>
          <button type="submit" class="btn">Login</button>
      </form>
  </div>
  
  </body>
  </html>
  `);
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login'}));

router.get('/signup', (req, res) => {
  res.send('signup');
});

router.post('/signup', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/signup'
}));

router.get('/profile', (req, res) => {
  res.send('Sucesss');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
