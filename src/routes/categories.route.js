const { Router } = require('express');
const { categoriesController } = require('../controllers');

const categoriesRouter = Router();

categoriesRouter.post('/', categoriesController.create);
categoriesRouter.get('/', categoriesController.getAll);
categoriesRouter.get('/:id', categoriesController.getOne);
categoriesRouter.patch('/:id', categoriesController.update);
categoriesRouter.delete('/:id', categoriesController.remove);

exports.categoriesRouter = categoriesRouter;
