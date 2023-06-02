'use strict';

const express = require('express');

const {
  getAllExpenses,
  getOneExpense,
  createExpense,
  changeExpense,
  deleteExpense,
} = require('../controllers/expensesController');

const expensesRouter = express.Router();

expensesRouter.get('/', getAllExpenses);
expensesRouter.get('/:expenseId', getOneExpense);
expensesRouter.post('/', createExpense);
expensesRouter.patch('/:expenseId', changeExpense);
expensesRouter.delete('/:expenseId', deleteExpense);

module.exports = expensesRouter;
