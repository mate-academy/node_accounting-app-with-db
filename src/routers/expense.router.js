'use strict';

const express = require('express');
const expensesRouter = express.Router();
const expensesController = require('../controllers/expense.controller');

expensesRouter.get('/', expensesController.getExpenses);

expensesRouter.get('/:id', expensesController.getExpense);

expensesRouter.post('/', expensesController.createExpense);

expensesRouter.delete('/:id', expensesController.deleteExpense);

expensesRouter.patch('/:id', expensesController.updateExpense);

module.exports = {
  expensesRouter,
};
