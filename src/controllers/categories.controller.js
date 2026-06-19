const express = require('express');

const {
  getAllCategories,
  getCategoryById,
  deleteCategory,
  createCategory,
  updateCategory,
} = require('../routers/categories.router.js');

const categoriesRoute = express.Router();

categoriesRoute.get('/', getAllCategories);

categoriesRoute.get('/:id', getCategoryById);

categoriesRoute.post('/', createCategory);

categoriesRoute.delete('/:id', deleteCategory);

categoriesRoute.patch('/:id', updateCategory);

module.exports = { categoriesRoute };
