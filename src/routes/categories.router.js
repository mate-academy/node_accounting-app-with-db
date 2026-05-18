const express = require('express');
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  removeCategory,
} = require('../controllers/categories.controller');

const categoriesRouter = express.Router();

categoriesRouter.get('/', getCategories);

categoriesRouter.get('/:id', getCategoryById);

categoriesRouter.post('/', createCategory);

categoriesRouter.patch('/:id', updateCategory);

categoriesRouter.delete('/:id', removeCategory);

module.exports = { categoriesRouter };
