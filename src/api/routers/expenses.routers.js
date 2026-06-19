const { expenseControllers } = require('../controllers/expenses.controllers');

const { Router } = require('express');

const expensesRouter = Router();

expensesRouter.get('/', expenseControllers.getAll);

expensesRouter.get('/:id', expenseControllers.getExpense);

expensesRouter.post('/', expenseControllers.createExpense);

expensesRouter.patch('/:id', expenseControllers.updateExpense);

expensesRouter.delete('/:id', expenseControllers.deleteExpense);

module.exports = {
  expensesRouter,
};
