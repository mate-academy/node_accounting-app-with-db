const express = require('express');
const expenseRoute = express.Router();
const expenseController = require('./../controllers/expense.controller');

expenseRoute.get('/', expenseController.getExpenses);

expenseRoute.get('/:id', expenseController.getOneExpense);

expenseRoute.post('/', expenseController.createExpense);

expenseRoute.patch('/:id', expenseController.updateExpense);

expenseRoute.delete('/:id', expenseController.removeExpense);

module.exports = { expenseRoute };
