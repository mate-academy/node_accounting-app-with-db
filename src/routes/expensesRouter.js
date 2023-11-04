'use strict';

const express = require('express');
const {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  modifyExpense,
} = require('../controllers/expensesController.js');

const expensesRouter = express.Router();

expensesRouter.get('/', getExpenses);
expensesRouter.post('/', createExpense);
expensesRouter.get('/:id', getExpense);
expensesRouter.delete('/:id', deleteExpense);
expensesRouter.patch('/:id', modifyExpense);

module.exports = {
  expensesRouter,
};
