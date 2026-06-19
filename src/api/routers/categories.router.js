const { Router } = require('express');
const {
  categoriesControllers,
} = require('../controllers/categories.controller');

const categoriesRouter = Router();

categoriesRouter.get('/', categoriesControllers.getAll);

categoriesRouter.get('/:id', categoriesControllers.getCategory);

categoriesRouter.post('/', categoriesControllers.createCategory);

categoriesRouter.patch('/:id', categoriesControllers.updateCategory);

categoriesRouter.delete('/:id', categoriesControllers.deleteCategory);

module.exports = {
  categoriesRouter,
};
