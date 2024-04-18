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
        console.log(info)
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
    let today=new Date()
    today=today.toDateString()
    let expiryDate=data.duration*30*24*60*60*1000 ;
    
    try{
        const user=await User.findById({_id:userId})
        if(user.memberShipStatus)
        {
            expiryDate=expiryDate+Date.parse(user.membership)
        }

        else
        {
            expiryDate=expiryDate+Date.now()
        }

        expiryDate=new Date(expiryDate)
        expiryDate=expiryDate.toDateString()
        const updatedUser = await User.findByIdAndUpdate(userId,{ memberShipStatus: true,membership:expiryDate });
        const newMembership=new Membership({userId:userId,productId:data.id,purchaseDate:today,expiryDate:expiryDate})
        await newMembership.save();
        res.send({success:true})

    }
    catch(err){
        console.log(err)
        res.json({sucess:false,message:err})
    }


}