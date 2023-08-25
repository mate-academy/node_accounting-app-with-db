'use strict';

const express = require('express');
const expensesController = require('../controllers/expenseController');

const expenseRouter = express.Router();

expenseRouter.get('/', expensesController.getAllExpenses);
expenseRouter.get('/:expenseId', expensesController.getExpenseById);
expenseRouter.delete('/:expenseId', expensesController.deleteExpense);
expenseRouter.post('/', expensesController.addExpense);
expenseRouter.patch('/:expenseId', expensesController.updateExpense);

module.exports = { expenseRouter };
