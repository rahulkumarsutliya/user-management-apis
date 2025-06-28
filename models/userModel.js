const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    email : {type:String,required:false,unique:true,sparse:true,match:[/^\S+@\S+\.\S+$/, 'Please enter a valid email address']},
    mobile : {type:String},
    gender : {type: String, enum:['male','female','others']},
    location : String,
    userType: String,
    interestedArea: String,
    otp : String,
    otpExpires : Date,
    isVerified : { type : Boolean, default:false},
});

module.exports = mongoose.model('User',userSchema);