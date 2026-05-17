const express = require('express');
const categoriesController = require('../controllers/categories.controller');

const router = express.Router();

router.get('/', categoriesController.getAllCategories);
router.get('/:categoryId', categoriesController.getCategory);
router.post('/', categoriesController.postCategory);
router.delete('/:categoryId', categoriesController.removeCategory);
router.patch('/:categoryId', categoriesController.updateCategory);

module.exports = router;
