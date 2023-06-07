'use strict';

const express = require('express');
const expenseController = require('../controllers/expenseController');
const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getExpenses);
expenseRouter.get('/:expenseId', expenseController.getExpenseById);
expenseRouter.post('/', expenseController.createExpense);
expenseRouter.delete('/:expenseId', expenseController.deleteExpense);
expenseRouter.patch('/:expenseId', expenseController.updateExpense);

module.exports = {
  expenseRouter,
};
