const express = require('express');
const expenseRoute = express.Router();
const expenseController = require('./../controllers/expense.controller');

expenseRoute.get('/', expenseController.getAllExpenses);

expenseRoute.post('/', expenseController.createExpense);

expenseRoute.get('/:id', expenseController.getOneExpense);

expenseRoute.delete('/:id', expenseController.removeExpense);

expenseRoute.patch('/:id', expenseController.updateExpense);

module.exports = { expenseRoute };
