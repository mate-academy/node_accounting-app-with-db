const { Router } = require('express');
const express = require('express');
const expensesController = require('./controller');

const expensesRouter = Router();

expensesRouter.get('/expenses', expensesController.getAllExpenses);
expensesRouter.get('/expenses/:id', expensesController.getOneExpense);

expensesRouter.post(
  '/expenses',
  express.json(),
  expensesController.addNewExpense,
);

expensesRouter.delete('/expenses/:id', expensesController.removeExpense);

expensesRouter.patch(
  '/expenses/:id',
  express.json(),
  expensesController.updateExpense,
);

module.exports = expensesRouter;
