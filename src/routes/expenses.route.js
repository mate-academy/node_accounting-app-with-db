/* eslint-disable no-console */
const express = require('express');
const expenseController = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', expenseController.getAllExpenses);

expensesRouter.get('/:id', expenseController.getExpenseForPerson);

expensesRouter.delete('/:id', expenseController.removeExpense);

expensesRouter.patch('/:id', expenseController.updateExpense);

expensesRouter.post('/', expenseController.addExpense);

module.exports = { expensesRouter };
