const express = require('express');

const expenseRoute = express.Router();

const expenseController = require('../controller/expense.controller');

expenseRoute.get('/', expenseController.getExpenses);

expenseRoute.get('/:id', expenseController.getExpenseById);

expenseRoute.post('/', expenseController.createExpense);

expenseRoute.patch('/:id', expenseController.updateExpense);

expenseRoute.delete('/:id', expenseController.deleteExpenseById);

module.exports = { expenseRoute };
