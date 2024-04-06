// app.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes')
require('dotenv').config()

// Configure mongoose
mongoose.connect( process.env.DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true });

// Configure passport

// Express middleware
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(session({
    secret:process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  }));

  require('./config/passport');


// Routes
app.use(authRoutes)
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
