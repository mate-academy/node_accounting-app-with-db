'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses');

const routerExpenses = express.Router();

routerExpenses.get('/', expenseController.getAllExpenses);
routerExpenses.get('/:expenseId', expenseController.getOneExpense);
routerExpenses.post('/', express.json(), expenseController.addExpense);
routerExpenses.delete('/:expenseId', expenseController.removeExpense);

routerExpenses.patch(
  '/:expenseId',
  express.json(),
  expenseController.updateExpense
);

module.exports = {
  routerExpenses,
};
