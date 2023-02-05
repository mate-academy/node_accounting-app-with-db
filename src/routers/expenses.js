'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);
expensesRouter.post('/', express.json(), expensesController.addExpense);
expensesRouter.get('/:expenseId', expensesController.getById);
expensesRouter.delete('/:expenseId', expensesController.removeExpense);

expensesRouter.patch(
  '/:expenseId',
  express.json(),
  expensesController.updateExpense,
);

module.exports = expensesRouter;
