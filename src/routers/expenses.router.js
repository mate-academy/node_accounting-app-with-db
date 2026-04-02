const expensesController = require('../controller/expenses.controller');

const Router = require('express').Router;

const expensesRouter = Router();

expensesRouter.get('/', expensesController.getExpenses);
expensesRouter.get('/:id', expensesController.getExpenseById);
expensesRouter.post('/', expensesController.createExpense);
expensesRouter.delete('/:id', expensesController.deleteExpense);
expensesRouter.patch('/:id', expensesController.updateExpense);

module.exports = {
  expensesRouter,
};
