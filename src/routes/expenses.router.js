const express = require('express');
const {
  createExpense,
  getExpenseById,
  getExpenseByQuery,
  deleteExpense,
  updateExpense,
} = require('../controllers/expense.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', getExpenseByQuery);

expensesRouter.post('/', createExpense);

expensesRouter.get('/:id', getExpenseById);

expensesRouter.delete('/:id', deleteExpense);

expensesRouter.patch('/:id', updateExpense);

module.exports = { expensesRouter };
