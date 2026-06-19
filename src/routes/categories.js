const express = require('express');

const {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
} = require('../controllers/categoriesController.js');

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);
router.patch('/:id', updateCategory);

module.exports = router;
