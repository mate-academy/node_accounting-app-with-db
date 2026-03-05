const { Router } = require('express');
const categoriesController = require('../controllers/categories.controller');
const { asyncHandler } = require('../utils');

const categoriesRouter = Router();

categoriesRouter.get('/', asyncHandler(categoriesController.getAll));
categoriesRouter.post('/', asyncHandler(categoriesController.create));
categoriesRouter.get('/:id', asyncHandler(categoriesController.getOne));
categoriesRouter.delete('/:id', asyncHandler(categoriesController.deleteOne));
categoriesRouter.patch('/:id', asyncHandler(categoriesController.update));

module.exports = { categoriesRouter };
