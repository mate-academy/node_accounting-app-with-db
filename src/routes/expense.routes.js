const express = require('express');
const expenseController = require('../controllers/expense.controller');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getAllExpenses);
expenseRouter.get('/:id', expenseController.getExpenseById);
expenseRouter.post('/', expenseController.createExpense);
expenseRouter.patch('/:id', expenseController.updateExpense);
expenseRouter.delete('/:id', expenseController.deleteExpense);

module.exports = expenseRouter;
