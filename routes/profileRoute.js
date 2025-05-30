const express = require('express');
const router = express.Router();
const  protect  = require('../middlewares/authMiddleware');
const {getProfile,updateProfile} = require('../controllers/profileController');

router.get('/',protect,getProfile);
router.put('/',protect,updateProfile);

module.exports = router;