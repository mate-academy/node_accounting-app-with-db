'use strict';

const express = require('express');
const { expensesController } = require('./expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAllExpenses);
expensesRouter.get('/:id', expensesController.getExpenseById);
expensesRouter.post('/', expensesController.createNewExpense);
expensesRouter.patch('/:id', expensesController.updateExpense);
expensesRouter.delete('/:id', expensesController.deleteExpense);

module.exports = {
  expensesRouter,
};
