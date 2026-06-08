const express = require('express');

const expensesController = require('../controllers/expenses.controller.js');

module.exports = function () {
  const expensesRouter = express.Router();

  expensesRouter.get('/', expensesController.getAll);
  expensesRouter.get('/:id', expensesController.getById);
  expensesRouter.post('/', expensesController.addExpense);
  expensesRouter.delete('/:id', expensesController.deleteExpense);
  expensesRouter.patch('/:id', expensesController.updateExpense);

  return expensesRouter;
};
