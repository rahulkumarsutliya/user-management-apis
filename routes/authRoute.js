const express = require('express');
const router = express.Router();
const {login,verifyOtp,resendOtp,googleSignIn} = require('../controllers/authController');

router.post('/login',login);
router.post('/verify-otp',verifyOtp);
router.post('/resend-otp',resendOtp);
router.post('/google-sign-in',googleSignIn);


module.exports = router;