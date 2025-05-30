const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {addAddress,getAddress,updateAddress,setDefaultAddress} = require('../controllers/addressController');


router.post('/',protect,addAddress);
router.get('/',protect,getAddress);
router.put('/',protect,updateAddress);
router.put('/default',protect,setDefaultAddress);

module.exports = router;