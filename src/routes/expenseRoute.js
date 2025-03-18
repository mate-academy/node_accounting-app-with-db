const express = require('express');
const expenseController = require('../controllers/expenseController');

const expenseRoute = express.Router();

expenseRoute.get('/', expenseController.getExpenses);
expenseRoute.get('/:id', expenseController.getExpense);
expenseRoute.post('/', expenseController.createExpense);
expenseRoute.patch('/:id', expenseController.updateExpense);
expenseRoute.delete('/:id', expenseController.removeExpense);

module.exports = { expenseRoute };
