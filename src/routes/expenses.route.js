const express = require('express');
const expenseRoutes = express.Router();
const expensesController = require('../controllers/expenses.controller');

expenseRoutes.get('/', expensesController.getAll);
expenseRoutes.get('/:id', expensesController.getExpense);
expenseRoutes.post('/', expensesController.createExpense);
expenseRoutes.patch('/:id', expensesController.updateExpense);
expenseRoutes.delete('/:id', expensesController.deleteExpense);

module.exports = expenseRoutes;
