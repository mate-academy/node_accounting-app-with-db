'use strict';

const express = require('express');
const cors = require('cors');
const {
  getExpenses,
  getExpenseById,
  addExpense,
  changeExpense,
  removeExpense,
} = require('../controllers/expensesControllers');

const expensesRouter = express.Router();

expensesRouter.get('/', cors(), getExpenses);

expensesRouter.get('/:id', getExpenseById);

expensesRouter.post('/', addExpense);

expensesRouter.put('/:id', changeExpense);

expensesRouter.delete('/:id', removeExpense);

module.exports = {
  expensesRouter,
};
