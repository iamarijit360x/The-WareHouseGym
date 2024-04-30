const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
//const MongoStore = require('connect-mongo');


require('dotenv').config();

// Configure mongoose
mongoose.connect(process.env.DB_URL);

// Configure passport
require('./config/passport');

// Express middleware
app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true, // Make sure to set 'secure' to true if your app is served over HTTPS
        // Ensure cross-site cookies are allowed
    }
    
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(authRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
