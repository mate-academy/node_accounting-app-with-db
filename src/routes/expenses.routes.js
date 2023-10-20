'use strict';

const express = require('express');
const expensesRouter = express.Router();
const controller = require('../controllers/expenses.controller');

expensesRouter.get('/', controller.getExpenses);
expensesRouter.get('/:id', controller.getOneExpense);
expensesRouter.post('/', controller.postExpense);
expensesRouter.delete('/:id', controller.deleteExpense);
expensesRouter.patch('/:id', controller.updateExpense);

module.exports = {
  expensesRouter,
};
