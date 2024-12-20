const { Router } = require('express');
const { expenseController } = require('./expense.controller.js');

const expenseRouter = Router();

expenseRouter.get('/', expenseController.getExpenses);
expenseRouter.post('/', expenseController.createExpense);
expenseRouter.get('/:id', expenseController.getExpenseById);
expenseRouter.patch('/:id', expenseController.updateExpense);
expenseRouter.delete('/:id', expenseController.deleteExpense);

module.exports = {
  expenseRouter,
};
