const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {addAddress,getAddress,updateAddress,setDefaultAddress} = require('../controllers/addressController');


router.post('/add',protect,addAddress);
router.get('/fetch',protect,getAddress);
router.put('/update',protect,updateAddress);
router.put('/default',protect,setDefaultAddress);

module.exports = router;