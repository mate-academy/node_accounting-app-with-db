'use strict';

const express = require('express');
const {
  getAllExpensesAction,
  addExpenseAction,
  getExpenseAction,
  deleteExpenseAction,
  updateExpenseAction,
} = require('../controllers/expenses');

const routerExpenses = express.Router();

routerExpenses.get('/', getAllExpensesAction);

routerExpenses.post('/', addExpenseAction);

routerExpenses.get('/:id', getExpenseAction);

routerExpenses.delete('/:id', deleteExpenseAction);

routerExpenses.patch('/:id', updateExpenseAction);

module.exports = routerExpenses;
