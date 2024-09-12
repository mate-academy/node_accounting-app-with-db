const express = require('express');

const expensesRouter = express.Router();

const {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
} = require('../controllers/expenses.controller');

expensesRouter.get('/', getExpenses);

expensesRouter.get('/:id', getExpenseById);

expensesRouter.post('/', createExpense);

expensesRouter.patch('/:id', updateExpense);

expensesRouter.delete('/:id', removeExpense);

module.exports = { expensesRouter };
