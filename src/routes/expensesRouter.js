const express = require('express');
const expenseRouter = express.Router();

const {
  getAllExpenses,
  addExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
} = require('./expensesController.js');

const service = require('./expensesServices.js');

expenseRouter.get('/', getAllExpenses);
expenseRouter.post('/', service.validateNewExpense, addExpense);
expenseRouter.get('/:id', getExpenseById);
expenseRouter.delete('/:id', deleteExpense);
expenseRouter.patch('/:id', updateExpense);

module.exports = { expenseRouter };
