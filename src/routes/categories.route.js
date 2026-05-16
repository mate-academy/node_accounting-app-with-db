const { Router } = require('express');
const categoriesController = require('../controllers/categories.controller');

const categoriesRouter = Router();

categoriesRouter.get('/', categoriesController.getAll);
categoriesRouter.get('/:id', categoriesController.getOne);
categoriesRouter.post('/', categoriesController.create);
categoriesRouter.patch('/:id', categoriesController.update);
categoriesRouter.delete('/:id', categoriesController.deleteOne);

module.exports = {
  categoriesRouter,
};
