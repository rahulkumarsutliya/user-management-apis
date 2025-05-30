const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required :true},
    fullname : String,
    mobile: String,
    flatnumber : String,
    street : String,
    landmark : String,
    pincode : String,
    city : String,
    state: String,
    isDefault : {type : Boolean , default : false},
});

module.exports = mongoose.model('Address',addressSchema);