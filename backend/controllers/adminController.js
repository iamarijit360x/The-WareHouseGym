const passport=require("passport")
const User=require('../models/UsersModel')
const {hashPassword}=require('../utils/passWordHash')
const {generateOTP}=require('../utils/randomGen');
const sendEmail = require("../utils/emailSender");
const { membershipReminderEmail } = require("../EmailTemplates/reminderEmailTemplate");




function getLastMembershipEndDate(user) {
    if (user.OrderHistory.length === 0) {
        return new Date(0); // Assign a very early date if no memberships
    }
    // Extract end dates and find the latest one
    const endDates = user.membership.map(m => new Date(m.end_date));
    return new Date(Math.max(...endDates));
}


exports.getUsers= async function(req,res,next){
    let users = await User.find({role:'user'}, 'firstname lastname email membership OrderHistory reminderSentOn');
    users = users.map(user => {
        let daysleft=getLastMembershipEndDate(user)-new Date()
        daysleft=Math.floor(daysleft/(1000*3600*24))
        return {
            ...user._doc, // Include existing fields
            daysLeft:daysleft
        };
    });

        users.sort((a, b) => a.daysLeft - b.daysLeft);


    
    res.json(users)
}
exports.sendReminderMail= async function(req,res,next){
    const user= await User.findById(req.body.id);
    console.log(req.body.id)
    if(user){
        const mailOptions = {
        to: user.email,
        subject: 'The Warehouse Gym Membership Expired',
        html:membershipReminderEmail(`${user.firstname} ${user.lastname}`)
        };
    
        try {
        await sendEmail(mailOptions);
        user.reminderSentOn=new Date()
        await user.save() 
        res.send(membershipReminderEmail(`${user.firstname} ${user.lastname}`))
        } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({otp:otp,message:'Error sending email'});
        } }
        else res.status(404).json({message:"User not found"})
}