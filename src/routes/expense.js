'use strict';

const express = require('express');

const {
  getAllExpenses,
  getExpense,
  createExpense,
  removeExpense,
  modifyExpense,
} = require('../controllers/expenses');

const expensesRouter = express.Router();

expensesRouter.get('/', getAllExpenses);
expensesRouter.post('/', createExpense);
expensesRouter.get('/:expenseId', getExpense);
expensesRouter.delete('/:expenseId', removeExpense);
expensesRouter.patch('/:expenseId', modifyExpense);

module.exports = {
  expensesRouter,
};
