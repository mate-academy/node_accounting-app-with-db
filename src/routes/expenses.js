'use strict';

const { Router } = require('express');
const {
  listExpenses,
  getExpense,
  createExpense,
  handleUpdate,
  deleteExpense,
} = require('../controllers/expenses.controller');
const { asyncHandler } = require('../middleware/asyncHandler');

const expensesRoute = Router();

expensesRoute.get('/', asyncHandler(listExpenses));
expensesRoute.get('/:id', asyncHandler(getExpense));
expensesRoute.post('/', asyncHandler(createExpense));
expensesRoute.patch('/:id', asyncHandler(handleUpdate));
expensesRoute.put('/:id', asyncHandler(handleUpdate));
expensesRoute.delete('/:id', asyncHandler(deleteExpense));

module.exports = { expensesRoute };
