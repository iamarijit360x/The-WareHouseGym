const passport=require("passport")
const User=require('../models/UsersModel')
const {hashPassword}=require('../utils/passWordHash')
const {generateOTP}=require('../utils/randomGen')




function getLastMembershipEndDate(user) {
    if (user.OrderHistory.length === 0) {
        return new Date(0); // Assign a very early date if no memberships
    }
    // Extract end dates and find the latest one
    const endDates = user.membership.map(m => new Date(m.end_date));
    return new Date(Math.max(...endDates));
}


exports.getUsers= async function(req,res,next){
    let users = await User.find({}, 'firstname lastname email membership OrderHistory');
    users = users.map(user => {
        let daysleft=getLastMembershipEndDate(user)-new Date()
        daysleft=Math.floor(daysleft/(1000*3600*24))
        console.log(daysleft)
     
        
        return {
            ...user._doc, // Include existing fields
            daysLeft:daysleft
        };
    });

        users.sort((a, b) => a.daysLeft - b.daysLeft);


    
    res.json(users)
}