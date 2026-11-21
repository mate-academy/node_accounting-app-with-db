'use strict';

function createExpensesRouter(ExpensesController) {
  const ExpensesRouter = require('express').Router();

  ExpensesRouter.get('/', ExpensesController.getAllExpenses);

  ExpensesRouter.post('/', ExpensesController.createExpenses);

  ExpensesRouter.get('/:id', ExpensesController.getExpensesById);

  ExpensesRouter.patch('/:id', ExpensesController.updateExpensesById);

  ExpensesRouter.delete('/:id', ExpensesController.deleteExpensesById);

  return ExpensesRouter;
}

module.exports = {
  createExpensesRouter,
};
