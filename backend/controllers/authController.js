const passport=require("passport")
const User=require('../models/UsersModel')


exports.signup=async (req,res)=>{
    const {fistname,lastname,email,password}=req.body
   try{ 
        const exists= await User.findOne({email:email})
        if(exists){
        return res.json({userExists:"True"})
           
        }
       
        const newUser=new User({fistname:fistname,lastname:lastname,email:email,password:password})

        const response=await newUser.save();
        return res.json({"success":true})
        
    
        }
    catch (error) {
        console.error("Error occurred during signup:", error);
        return res.status(500).send("Internal Server Error");
    }
}


exports.login = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid Credentials' });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
            return res.json({ success: true, message: 'Login successful', user });
        });
    })(req, res, next);
};


exports.signout=(req,res)=>{
    req.logout((err)=>{
        if(err)
            console.log(err)
        res.end()
    });
}