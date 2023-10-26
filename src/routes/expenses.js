'use strict';

const express = require('express');
const expenseControllers = require('../controllers/expenses');
const expenseRouter = express.Router();

expenseRouter.get('/', expenseControllers.getAllExpenses);
expenseRouter.get('/:expenseId', expenseControllers.getExpenseById);
expenseRouter.post('/', express.json(), expenseControllers.createExpense);
expenseRouter.delete('/:expenseId', expenseControllers.removeExpense);

expenseRouter.patch('/:expenseId', express.json(),
  expenseControllers.updateExpense);

module.exports = {
  expenseRouter,
};
