const mongoose=require('mongoose');


const membershipSchema = new mongoose.Schema({
    start_date: Date,
    end_date: Date,
    status: Boolean,
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
    OrderHistory:[membershipSchema]
});

const UserModel=mongoose.model("User",userSchema)
module.exports=UserModel