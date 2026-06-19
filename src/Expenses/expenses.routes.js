const express = require('express');
const expensesController = require('./expenses.controler');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);

expensesRouter.get('/:id', expensesController.getOne);

expensesRouter.post('/', expensesController.postOne);

expensesRouter.delete('/:id', expensesController.delete);

expensesRouter.patch('/:id', expensesController.updateOne);

module.exports = expensesRouter;
