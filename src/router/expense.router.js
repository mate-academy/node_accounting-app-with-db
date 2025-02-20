const express = require('express');
const expensesController = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAllExpenses);
expensesRouter.post('/', expensesController.createExpense);
expensesRouter.get('/:id', expensesController.getExpenseById);
expensesRouter.delete('/:id', expensesController.removeExpense);
expensesRouter.patch('/:id', expensesController.updateExpense);

module.exports = {
  expensesRouter,
};
