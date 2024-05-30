const express = require('express');
const expensesRouter = express.Router();
const expensesController = require('../controllers/expenses.controller.js');

expensesRouter.get('/', expensesController.getAllExpenses);

expensesRouter.get('/:id', expensesController.getExpenseById);

expensesRouter.post('/', expensesController.createExpense);

expensesRouter.delete('/:id', expensesController.deleteExpense);

expensesRouter.patch('/:id', expensesController.updateExpense);

module.exports = expensesRouter;
