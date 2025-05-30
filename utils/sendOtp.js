const nodemailer = require('nodemailer');

const sendOtp = async(identifier, otp)=>{
    if(identifier.includes('@')){
    let transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : process.env.MY_GMAIL,
            pass : process.env.MY_PASS
        },
    });

    let mailOptions = {
        from : process.env.MY_GMAIL,
        to:identifier,
        subject : "OTP for verification",
        text : `Your OTP is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    }else{
        console.log(`Your Otp is ${otp}, sent to mobile: ${identifier}`)
    }
};


module.exports = sendOtp;