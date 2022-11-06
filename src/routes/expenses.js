'use strict';

const {
  getAllExpenses,
  setExpense,
  delExpense,
  getExpense,
  patchExpense,
} = require('../controllers/expenses');

const express = require('express');
const routerExpenses = express.Router();

routerExpenses.get('/', express.json(), getAllExpenses);
routerExpenses.post('/', express.json(), setExpense);
routerExpenses.delete('/:expenseId', express.json(), delExpense);
routerExpenses.get('/:expenseId', express.json(), getExpense);
routerExpenses.patch('/:expenseId', express.json(), patchExpense);
module.exports = { routerExpenses };
