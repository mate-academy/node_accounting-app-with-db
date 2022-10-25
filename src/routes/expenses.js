'use strict';

const express = require('express');
const { initExpensesController } = require('../controllers/expenses');

function initExpenseRouter(userController) {
  const expenseController = initExpensesController(userController);

  const expenseRouter = express.Router();

  expenseRouter.post('/', expenseController.addExpense);

  expenseRouter.get('/', expenseController.getAllExpenses);

  expenseRouter.get('/:id', expenseController.getExpenseById);

  expenseRouter.patch('/:id', expenseController.updateExpenseById);

  expenseRouter.delete('/:id', expenseController.deleteExpenseById);

  return {
    expenseRouter,
  };
}

module.exports = { initExpenseRouter };
