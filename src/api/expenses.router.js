const { Router } = require('express');
const { controller: expensesController } = require('./expenses.controller');

const expensesRouter = Router();

expensesRouter.get('/', expensesController.getExpenses);
expensesRouter.get('/:id', expensesController.getExpense);
expensesRouter.post('/', expensesController.createExpense);
expensesRouter.delete('/:id', expensesController.deleteExpense);
expensesRouter.patch('/:id', expensesController.updateExpense);

module.exports = {
  expensesRouter,
};
