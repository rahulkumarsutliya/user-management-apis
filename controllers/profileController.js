const User = require('../models/userModel');

//get user details
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message || "Server error" })
    }
};

//update user

exports.updateProfile = async (req, res) => {
    const { name, email, gender, location, mobile, userType, interestedArea } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).send({ message: "User not found" });

        if (name) user.name = name;
        if (email) user.email = email;
        if (gender) user.gender = gender;
        if (location) user.location = location;
        if (mobile) user.mobile = mobile;
        if (userType) user.userType = userType;
        if (interestedArea) user.interestedArea = interestedArea;

        await user.save();

        res.status(200).send({ message: "Profile Updated", user });
    } catch (err) {
        res.status(500).send({ message: err.message || "Server Error" })
    }
};
