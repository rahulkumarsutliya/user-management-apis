const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    email : {type:String,required:true,unique:true,match:[/^\S+@\S+\.\S+$/, 'Please enter a valid email address']},
    mobile : String,
    gender : String,
    location : String,
    otp : String,
    otpExpires : Date,
    isVerified : { type : Boolean, default:false},
});

module.exports = mongoose.model('User',userSchema);