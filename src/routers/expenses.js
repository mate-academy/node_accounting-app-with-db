'use strict';

const express = require('express');
const {
  getAllExpenses,
  getExpenseById,
  addExpense,
  removeExpense,
  updateExpense,
} = require('../controllers/expenses');
const expensesRouter = express.Router();

expensesRouter.get('/', getAllExpenses);

expensesRouter.get('/:expenseId', getExpenseById);

expensesRouter.post('/', addExpense);

expensesRouter.delete('/:expenseId', removeExpense);

expensesRouter.patch('/:expenseId', updateExpense);

module.exports = expensesRouter;
