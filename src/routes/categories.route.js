const express = require('express');
const {
  getAllCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  deleteCategoryController,
  updateCategoryController,
} = require('../controllers/categories.controller');
const { Router } = express;

const categoriesRouter = Router();

categoriesRouter.get('/', getAllCategoriesController);

categoriesRouter.get('/:categoryId', getCategoryByIdController);

categoriesRouter.post('/', createCategoryController);

categoriesRouter.delete('/:categoryId', deleteCategoryController);

categoriesRouter.patch('/:categoryId', updateCategoryController);

module.exports = {
  categoriesRouter,
};
