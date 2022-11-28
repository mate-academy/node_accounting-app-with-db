'use strict';

const {
  expensesController,
} = require('../controller/expensesController');

const express = require('express');

// #region expensesRouter
const expensesRouter = express.Router();

function expences(app) {
  app.use('/expenses', expensesRouter);
  expensesRouter.use(express.json());
  expensesRouter.get('/', expensesController.getExpenses);
  expensesRouter.get('/:expenseId', expensesController.getExpense);
  expensesRouter.post('/', expensesController.postExpense);
  expensesRouter.patch('/:expenseId', expensesController.patchExpense);
  expensesRouter.delete('/:expenseId', expensesController.removeExpense);
}
// #endregion

module.exports = {
  expences,
};
