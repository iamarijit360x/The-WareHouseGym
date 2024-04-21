const passport = require("passport");
const User = require('../models/UsersModel');

exports.expiryCheck = async (req, res,next) => {
    const data = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        
        const validMemberships =user.membership.filter(membership => {
                return membership.end_date >= new Date(); // Keep only valid memberships
            });
        if(validMemberships.length>0 && validMemberships[0].end_date>new Date())
        { validMemberships[0]['status']=true;}

        user.membership = validMemberships; // Assign the filtered array back to user's membership property
        await user.save(); // Save the updated user
        next()
        
    } catch (error) {
        console.error('Error removing expired memberships:', error);
        res.status(500).send({ error: 'Error removing expired memberships' });
    }
};
