'use strict';

const express = require('express');
const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
} = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', getAllExpenses);
expensesRouter.get('/:id', getExpenseById);
expensesRouter.post('/', createExpense);
expensesRouter.patch('/:id', updateExpense);
expensesRouter.delete('/:id', removeExpense);

module.exports = { expensesRouter };
