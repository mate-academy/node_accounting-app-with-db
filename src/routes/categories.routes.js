const { Router } = require('express');
const categoriesController = require('../controllers/categories.controller');

const categoriesRouter = Router();

categoriesRouter.get('/', categoriesController.getAllCategories);
categoriesRouter.post('/', categoriesController.createCategory);
categoriesRouter.get('/:id', categoriesController.getCategoryById);
categoriesRouter.delete('/:id', categoriesController.deleteCategory);
categoriesRouter.patch('/:id', categoriesController.updateCategory);

module.exports = {
  categoriesRouter,
};
