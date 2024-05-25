const express = require('express');
const {
  httpGetAllExpenses,
  httpPostExpense,
  httpGetExpenseById,
  httpDeleteExpenseById,
  httpUpdateExpenseById,
} = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', httpGetAllExpenses);
expensesRouter.post('/', express.json(), httpPostExpense);
expensesRouter.get('/:id', httpGetExpenseById);
expensesRouter.delete('/:id', httpDeleteExpenseById);
expensesRouter.patch('/:id', express.json(), httpUpdateExpenseById);

module.exports = { expensesRouter };
