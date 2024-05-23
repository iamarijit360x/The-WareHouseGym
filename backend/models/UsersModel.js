const mongoose=require('mongoose');
const { verifyPassword } = require('../utils/passWordHash');


const membershipSchema = new mongoose.Schema({
    start_date: Date,
    end_date: Date,
    status: Boolean,
    personal_training:Boolean,
    trademil:Boolean,
    duration:Number
});

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: Number,
    phone: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    membership: [membershipSchema], // Array of nested membership schemas
    memberShipStatus: Boolean,
    OrderHistory:[membershipSchema],
    verified:Boolean,
    OTP:Number,
    role:{default:"user",type:String}
});

const UserModel=mongoose.model("User",userSchema)
module.exports=UserModel