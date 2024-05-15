const express = require('express');
const expensesRouter = express.Router();
const expensesController = require('../controllers/expenses.controller');

expensesRouter.use(express.json());

expensesRouter.get('/', expensesController.getAllExpenses);
expensesRouter.get('/:id', expensesController.getExpenseById);
expensesRouter.post('/', expensesController.createNewExpense);
expensesRouter.patch('/:id', expensesController.updateExpenseById);
expensesRouter.delete('/:id', expensesController.deleteExpenseById);

module.exports = {
  expensesRouter,
};
