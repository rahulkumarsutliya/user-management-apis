const express = require('express');
const router = express.Router();
const {addSubcategory,updateSubcategory,deleteSubcategory} = require('../controllers/subcategoryController');


router.post('/add',addSubcategory);
router.put('/update/:id',updateSubcategory);
router.delete('/delete/:id',deleteSubcategory);


module.exports = router;