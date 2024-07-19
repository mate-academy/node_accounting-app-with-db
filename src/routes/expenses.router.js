const express = require('express');
const expensesController = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAllExpenses);
expensesRouter.post('/', expensesController.createExpense);
expensesRouter.get('/:id', expensesController.getExpense);
expensesRouter.patch('/:id', expensesController.updateExpense);
expensesRouter.delete('/:id', expensesController.deleteExpense);

module.exports = {
  expensesRouter,
};
