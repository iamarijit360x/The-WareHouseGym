const passport=require("passport")
const User=require('../models/UsersModel')


exports.signup=async (req,res)=>{
    const {fistname,lastname,email,password}=req.body
   try{ 
        const exists= await User.findOne({email:email})
        if(exists){
            return res.send("User Already Exists")
        }
       
        const newUser=new User({fistname:fistname,lastname:lastname,email:email,password:password})

        await newUser.save();
        res.redirect("/login")
    
        }
    catch (error) {
        console.error("Error occurred during signup:", error);
        return res.status(500).send("Internal Server Error");
    }
}


 exports.login=passport.authenticate('local',{
    successRedirect:'/profile',
    failureMessage:'Invalid Credentials'

    })

exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err)
            console.log(err)
        res.redirect('/login')

    });
}