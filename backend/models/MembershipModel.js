const mongoose=require('mongoose');


const membershipSchema=new mongoose.Schema({
    userId:String,
    productId:String,
    duration:Number,
    personal_training:Boolean,
    trademil:Boolean
    
    
})

const MembershipModel=mongoose.model("Membership",membershipSchema)
module.exports=MembershipModel