/* eslint-disable function-paren-newline */
const { Router } = require('express');
const expensesRouter = Router();
const expensesController = require('../controllers/expensesController.js');

expensesRouter.get('/', expensesController.listAllExpenses);
expensesRouter.post('/', expensesController.createExpense);
expensesRouter.get('/:id', expensesController.getExpenseById);
expensesRouter.delete('/:id', expensesController.deleteExpense);
expensesRouter.patch('/:id', expensesController.updateExpenseById);

module.exports = { expensesRouter };
