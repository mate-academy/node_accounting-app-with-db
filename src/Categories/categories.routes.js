const express = require('express');
const categoriesController = require('./categories.controler');

const expensesRouter = express.Router();

expensesRouter.get('/', categoriesController.getAll);

expensesRouter.get('/:id', categoriesController.getOne);

expensesRouter.post('/', categoriesController.postOne);

expensesRouter.delete('/:id', categoriesController.deleteOne);

expensesRouter.patch('/:id', categoriesController.updateOne);

module.exports = expensesRouter;
