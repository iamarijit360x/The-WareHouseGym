const User=require('../models/UsersModel')
const Membership=require('../models/MembershipModel')
exports.buyMembership=async (req,res)=>{
    let data=req.body
    let personal_training=false,trademil=false;
    
    if(data.length){
        for(let i=0;i<data.length;i++)
        {
            if(data[i].hasOwnProperty('personal_training')){
                personal_training=true
            }

            else if(data[i].hasOwnProperty('trademil')){
                trademil=true
            }
        }
    }
  
    
    data=data[0]
        
        
    const userId=req.user.id
    console.log(data,personal_training,trademil)
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
            expiryDate=expiryDate.getTime()
            const duration=data.duration*30*24*60*60*1000
            expiryDate+=duration
            expiryDate=new Date(expiryDate)

            expiryDate.setMonth(newStartDate.getMonth() + data.duration);
            // Create a new membership object
            let newMembership = {
                start_date: newStartDate,
                end_date: expiryDate,
                duration:data.duration,
                personal_training:personal_training,
                trademil:trademil
             
            };
            if(user.membership.length===0)
            {
                newMembership.status=true;
            }
            const newOrder=new Membership({userId:userId,purchaseDate:new Date(),personal_training:personal_training,trademil:trademil,duration:data.duration})
            // Push the new membership object to the user's membership array
            user.membership.push(newMembership);
            user.OrderHistory.push(newMembership)
            await newOrder.save()
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