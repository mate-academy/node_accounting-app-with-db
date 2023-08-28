'use strict';

const express = require('express');
const categoriesRouter = express.Router();
const categoryController = require('../controllers/categories.js');

categoriesRouter.get('/', categoryController.getAll);

categoriesRouter.get('/:categoryId', categoryController.getOne);

categoriesRouter.post('/', categoryController.addOne);

categoriesRouter.patch('/:categoryId', categoryController.update);

categoriesRouter.delete('/:categoryId', categoryController.remove);

module.exports = { categoriesRouter };
