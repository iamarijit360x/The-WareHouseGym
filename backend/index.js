const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const adminRoutes=require('./routes/adminRoutes')
const userRoutes=require('./routes/userRoutes')
app.enable('trust proxy');


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
// IMPORTANT ALWAYS SET cookie:{
//          httpOnly:true,
//          sameSite:"none",
//          secure:true
//     }
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly:true,
        sameSite:"none",
        secure:true
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(authRoutes);
app.use(adminRoutes)
app.use(userRoutes)
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
