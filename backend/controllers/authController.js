const passport=require("passport")
const User=require('../models/UsersModel')
const Membership=require('../models/MembershipModel')
const {hashPassword}=require('../utils/passWordHash')

exports.signup=async (req,res)=>{
    const {firstname,lastname,email,password}=req.body
   try{ 
        const exists= await User.findOne({email:email})
        if(exists){
        return res.json({userExists:"True"})
           
        }
        const enPass=await hashPassword(password);
        const newUser=new User({firstname:firstname,lastname:lastname,email:email,password:enPass})

        await newUser.save();
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
            return res.status(401).json(info);
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
exports.buyMembership=async (req,res)=>{
    const data=req.body
    const userId=req.user.id
    let expiryDate=data.duration*30*24*60*60*1000+Date.now() ;
    
    User.findById(userId)
        .then(async user => {
            if (!user) {
                throw new Error('User not found');
            }
           
            let newStartDate=new Date();
            let expiryDate;
           
            if(user.membership && user.membership.length)
            {
                 const lastMembership = user.membership[user.membership.length - 1];
                 newStartDate = new Date(lastMembership.end_date);
                 
            }
            expiryDate = new Date(newStartDate);
            expiryDate.setMonth(newStartDate.getMonth() + data.duration);
            // Create a new membership object
            let newMembership = {
                start_date: newStartDate,
                end_date: expiryDate,
                duration:data.duration,
             
            };
            if(user.membership.length===0)
            {
                newMembership.status=true;
            }
            // Push the new membership object to the user's membership array
            user.membership.push(newMembership);
            user.OrderHistory.push(newMembership)
            // Save the updated user
            return await user.save();
        })
        .then(updatedUser => {
            
            res.json({success:true});
        })
        .catch(error => {
            console.error('Error updating user:', error);
            res.status(500).send({ error: 'Error updating user' });
        });


}