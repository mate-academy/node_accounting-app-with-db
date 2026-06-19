const express = require('express');
const router = express.Router();
const controller = require('../controllers/categories.controller');

router.get('/', controller.getCategories);
router.post('/', controller.createCategory);
router.get('/:id', controller.getCategoryById);
router.put('/:id', controller.updateCategoryById);
router.delete('/:id', controller.deleteCategoryById);

module.exports = router;
