'use strict';

const express = require('express');
const expensesRouter = express.Router();

const expensesController = require('../controllers/expenses');

expensesRouter.get('/', expensesController.getAllExpenses);
expensesRouter.get('/:expenseId', expensesController.getExpenseById);
expensesRouter.post('/', expensesController.createExpense);
expensesRouter.delete('/:expenseId', expensesController.removeExpense);
expensesRouter.patch('/:expenseId', expensesController.updateExpense);

module.exports = { expensesRouter };
