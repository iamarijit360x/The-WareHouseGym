// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/UsersModel');
const {verifyPassword}=require('../utils/passWordHash')
const customFields={
  username:'email'
}
passport.use(new LocalStrategy({usernameField:"email"},
   async (email, password, done) => {
    try {
      const user =  await User.findOne({email:email});
     
      if (!user) {
        console.log('Invalid usernmae')

        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!(await verifyPassword(password,user.password))) {
        console.log('Invalid passoword')

        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
