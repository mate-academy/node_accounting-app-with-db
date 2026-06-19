const express = require('express');
const { getExpenses, createExpense, getExpense, removeExpense, updateExpense } = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', getExpenses);
expensesRouter.post('/', createExpense);
expensesRouter.get(`/:id`, getExpense);
expensesRouter.delete('/:id', removeExpense);
expensesRouter.patch('/:id', updateExpense);

module.exports = { expensesRouter };