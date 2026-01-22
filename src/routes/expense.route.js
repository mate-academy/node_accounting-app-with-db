const express = require('express');
const {
  getExpenses,
  getOne,
  createExpense,
  updateExpense,
  removeExpense,
} = require('../controllers/expense.controller');

const expenseRouter = express.Router();

expenseRouter.get('/', getExpenses);

expenseRouter.get('/:id', getOne);

expenseRouter.post('/', express.json(), createExpense);

expenseRouter.patch('/:id', express.json(), updateExpense);

expenseRouter.delete('/:id', removeExpense);

module.exports = {
  expenseRouter,
};
