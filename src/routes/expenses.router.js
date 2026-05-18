const express = require('express');
const {
  getAllExpenses,
  getExpenseById,
  updateExpense,
  addExpense,
  deleteExpense,
} = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', getAllExpenses);

expensesRouter.get('/:id', getExpenseById);

expensesRouter.put('/:id', updateExpense);

expensesRouter.patch('/:id', updateExpense);

expensesRouter.post('/', addExpense);

expensesRouter.delete('/:id', deleteExpense);

module.exports = {
  expensesRouter,
};
