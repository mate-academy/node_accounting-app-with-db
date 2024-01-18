'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses.controller');
const expenseRouter = express.Router();

expenseRouter.post('/', expenseController.createNewExpense);

expenseRouter.get('/', expenseController.getAllExpenses);

expenseRouter.get('/:expenseId', expenseController.getExpenseById);

expenseRouter.patch('/:expenseId', expenseController.updateExpense);

expenseRouter.delete('/:expenseId', expenseController.deleteExpense);

module.exports = {
  expenseRouter,
};
