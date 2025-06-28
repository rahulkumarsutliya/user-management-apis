const express = require('express');
const router = express.Router();
const  protect  = require('../middlewares/authMiddleware');
const {getProfile,updateProfile} = require('../controllers/profileController');

router.get('/fetch',protect,getProfile);
router.put('/update',protect,updateProfile);

module.exports = router;