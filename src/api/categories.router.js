const { Router } = require('express');
const {
  categoriesController,
} = require('../controllers/categories.controller');

const categoriesRouter = Router();

categoriesRouter.get('/', categoriesController.getAll);
categoriesRouter.post('/', categoriesController.create);
categoriesRouter.get('/:id', categoriesController.getOne);
categoriesRouter.delete('/:id', categoriesController.deleteOne);
categoriesRouter.patch('/:id', categoriesController.update);

module.exports = {
  categoriesRouter,
};
