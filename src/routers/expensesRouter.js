'use strict';

const { Router } = require('express');
const expensesController = require('../controllers/expensesController');

const expensesRouter = Router();

expensesRouter.post('/', expensesController.createExpense);
expensesRouter.get('/', expensesController.getExpenses);
expensesRouter.get('/:id', expensesController.getExpenseById);
expensesRouter.patch('/:id', expensesController.updateExpense);
expensesRouter.delete('/:id', expensesController.deleteExpense);

module.exports = {
  expensesRouter,
};
