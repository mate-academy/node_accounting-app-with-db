'use strict';

const { Router } = require('express');
const categoriesController = require('../controllers/categories.controller');

const categoriesRouter = Router();

categoriesRouter.get('/', categoriesController.getAll);
categoriesRouter.post('/', categoriesController.create);
categoriesRouter.get('/:id', categoriesController.getOne);
categoriesRouter.patch('/:id', categoriesController.update);
categoriesRouter.delete('/:id', categoriesController.remove);

module.exports = { categoriesRouter };
