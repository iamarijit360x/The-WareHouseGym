const mongoose=require('mongoose');


const membershipSchema=new mongoose.Schema({
    userId:String,
    productId:String,
    purchaseDate:Date,
    startDate:Date,
    expiryDate:Date
})

const MembershipModel=mongoose.model("Membership",membershipSchema)
module.exports=MembershipModel