const express = require('express');
const router = express.Router();
const {getAllCategories,addCategory,updateCategory,deleteCategory} = require('../controllers/categoryController');


router.get('/fetch',getAllCategories);
router.post('/add',addCategory);
router.put('/update/:id',updateCategory);
router.delete('/delete/:id',deleteCategory);

module.exports = router;