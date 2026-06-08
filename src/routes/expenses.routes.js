const express = require('express');
const expensesController = require('../controllers/expenses.controller.js');
const { Expense } = require('../models/Expense.model.js');
const { User } = require('../models/User.model.js');

module.exports = function (users, expenses) {
  const expensesRouter = express.Router();

  expensesRouter.get('/', expensesController.getAllExpenses(Expense));

  expensesRouter.post('/', expensesController.postExpenses(User, Expense));

  expensesRouter.get('/:id', expensesController.getExpenseById(Expense));

  expensesRouter.delete('/:id', expensesController.deleteExpense(Expense));

  expensesRouter.patch('/:id', expensesController.patchExpense(Expense));

  return expensesRouter;
};
