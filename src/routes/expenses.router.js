const express = require('express');
const {
  getAllExpensesController,
  getExpenseByIdController,
  deleteExpenseController,
  createExpenseController,
  updateExpenseController,
} = require('../controllers/expenses.controller');

const { Router } = express;

const expensesRouter = Router();

expensesRouter.get('/', getAllExpensesController);

expensesRouter.get('/:expenseId', getExpenseByIdController);

expensesRouter.post('/', createExpenseController);

expensesRouter.delete('/:expenseId', deleteExpenseController);

expensesRouter.patch('/:expenseId', updateExpenseController);

module.exports = {
  expensesRouter,
};
