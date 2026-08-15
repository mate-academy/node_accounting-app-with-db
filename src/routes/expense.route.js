'use strict';

const express = require('express');
const createExpenseController = require('../controllers/expense.controller.js');

function createExpenseRouter(userService, expenseService) {
  const expenseRouter = express.Router();
  const expenseController = createExpenseController(
    userService,
    expenseService,
  );

  expenseRouter.get('/expenses', expenseController.getExpenses);
  expenseRouter.get('/expenses/:id', expenseController.getExpenseById);
  expenseRouter.post('/expenses', expenseController.createExpense);
  expenseRouter.delete('/expenses/:id', expenseController.removeExpense);
  expenseRouter.patch('/expenses/:id', expenseController.updateExpense);

  return expenseRouter;
}

module.exports = createExpenseRouter;
