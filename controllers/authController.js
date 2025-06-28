const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const sendOtp = require('../utils/sendOtp');
const verifyGoogleToken = require('../utils/googleAuth');


//send otp to identifier(mobile or email)
exports.login = async (req, resp) => {
    const { identifier } = req.body;
    try {
        if(!identifier){
            return resp.status(401).send({message : "Please provide value into field"});
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

        let user = await User.findOne({ $or: [{ email: identifier }, { mobile: identifier }] });
        if (!user) {
            user = new User({
                email: identifier.includes('@') ? identifier : undefined,
                mobile: !identifier.includes('@') ? identifier : undefined,
            });
        }

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        sendOtp(identifier, otp);
        resp.status(200).send({ message: 'OTP sent' });
    } catch (err) {
        resp.status(500).send({ message: err.message || "Error In send otp" });
    }
};

//verify otp / login
exports.verifyOtp = async (req, res) => {
    const { identifier, otp } = req.body;
    try {
        if(!identifier){
            return res.status(401).send({message : "Fields cannot be empty"});
        }
        const user = await User.findOne({
            $or: [{ email: identifier }, { mobile: identifier }],
            otp,
            otpExpires: { $gt: new Date() }
        });

        if (!user) return res.status(400).send({ message: 'Invalid or expired OTP' });

        user.otp = undefined;
        user.otpExpires = undefined;
        user.isVerified = true;
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES});
        res.status(200).send({message:"OTP verified successfully",data:{token, user} });
    } catch (err) {
        res.status(500).send({ message: err.message || "Something went wrong" });
    }
};

//resend otp
exports.resendOtp = async (req, res) => {
    const { identifier } = req.body;
    try{
        if(!identifier){
            return res.status(401).send({message: "Fill Value into the Field"});
        }
    const user = await User.findOne({ $or: [{ email: identifier }, { mobile: identifier }] });

    if (!user) return res.status(404).json({ message: 'User not found' });


    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    sendOtp(identifier, otp);
    res.status(200).send({ message: 'OTP resent' });
    }catch(err){
        res.status(500).send({message:err.message || "Something went wrong"});
    };
};

//google sign-in
exports.googleSignIn = async(req,res)=>{
    try{
        const {token} = req.body;
        const googleUser = await verifyGoogleToken(token);

        if(!token){
            return res.status(401).send({message: "Please provide token"});
        }

        let user = await User.findOne({email : googleUser.email});
        if(!user){
            user = new User({
                name : googleUser.name,
                email : googleUser.email,
                picture : googleUser.picture,
                isGoogleUser : true,
            });

            await user.save();
        }

        const authToken = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES});
        
         
        res.status(200).send({message : "User Login Successfully",data:{token:authToken,user}});
    }catch(err){
        res.status(500).send({message:err.message || "Server Error"});
    }
};