const express = require('express');
const expensesRouter = express.Router();
const {
  getAllExpenses,
  addExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
} = require('./expensesController.js');

const service = require('./expensesServices.js');

expensesRouter.get('/', getAllExpenses);
expensesRouter.post('/', service.validateNewExpense, addExpense);
expensesRouter.get('/:id', getExpenseById);
expensesRouter.delete('/:id', deleteExpense);
expensesRouter.patch('/:id', updateExpense);

module.exports = {
  expensesRouter,
};
