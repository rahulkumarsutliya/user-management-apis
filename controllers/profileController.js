const User = require('../models/userModel');

//get user details
exports.getProfile = async(req,resp)=>{
    try{
        const user = await User.findById(req.user.id);
        
        resp.status(200).send(user);
    }catch(err){
        resp.status(500).send({message:err.message || "Server error"})
    }
};

//update user

exports.updateProfile = async(req,resp)=>{
        const { name, email, gender, location,mobile } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (name) user.name = name;
    if (email) user.email = email;
    if (gender) user.gender = gender;
    if (location) user.location = location;
    if(mobile) user.mobile = mobile;
    await user.save();
    resp.status(200).send({message: "Profile Updated",user});
    }catch(err){
        resp.status(500).send({message:err.message || "Server Error"})
    }
};
