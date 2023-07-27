'use strict';

const express = require('express');
const {
  getAllExpensesController,
  createExpenseController,
  getOneExpenseController,
  removeExpenseController,
  updateExpenseController,
} = require('../controllers/expenses.controller');

const expensesRouter = express();

expensesRouter.get('/', getAllExpensesController);

expensesRouter.post('/', express.json(), createExpenseController);

expensesRouter.get('/:expenseId', getOneExpenseController);

expensesRouter.delete('/:expenseId', removeExpenseController);

expensesRouter.patch('/:expenseId', express.json(), updateExpenseController);

module.exports = { expensesRouter };
