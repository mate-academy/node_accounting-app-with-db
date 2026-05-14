const express = require('express');
const {
  createExpense,
  getAllExpenses,
  getExpensesById,
  updateExpenses,
  removeExpenses,
} = require('./expense.controller');
const expensesRouter = express.Router();

expensesRouter.get('/', getAllExpenses);
expensesRouter.post('/', createExpense);
expensesRouter.get('/:id', getExpensesById);
expensesRouter.delete('/:id', removeExpenses);
expensesRouter.patch('/:id', updateExpenses);

module.exports = expensesRouter;
