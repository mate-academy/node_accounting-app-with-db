'use strict';

const express = require('express');
const {
  operateAddExpense,
  operateGetExpensesByQuery,
  operateGetExpenseById,
  operateUpdateExpenseById,
  operateDeleteExpenseById,
} = require('../controllers/expenses');

const expenseRouter = express.Router();

expenseRouter.post('/', operateAddExpense);

expenseRouter.get('/', operateGetExpensesByQuery);

expenseRouter.get('/:id', operateGetExpenseById);

expenseRouter.patch('/:id', operateUpdateExpenseById);

expenseRouter.delete('/:id', operateDeleteExpenseById);

module.exports = {
  expenseRouter,
};
