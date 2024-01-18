'use strict';

const express = require('express');
const {
  getExpenses,
  getOneExpense,
  deleteExpense,
  createNewExpense,
  updateOneExpense,
} = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', getExpenses);

expensesRouter.get('/:id', getOneExpense);

expensesRouter.delete('/:id', deleteExpense);

expensesRouter.post('/', createNewExpense);

expensesRouter.patch('/:id', updateOneExpense);

module.exports = {
  expensesRouter,
};
