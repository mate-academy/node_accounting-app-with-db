const express = require('express');

const {
  getAllExpenses,
  getExpenseById,
  deleteExpense,
  createExpense,
  updateExpense,
} = require('../routers/expenses.router.js');

const expensesRoute = express.Router();

expensesRoute.get('/', getAllExpenses);

expensesRoute.get('/:id', getExpenseById);

expensesRoute.post('/', createExpense);

expensesRoute.delete('/:id', deleteExpense);

expensesRoute.patch('/:id', updateExpense);

module.exports = { expensesRoute };
