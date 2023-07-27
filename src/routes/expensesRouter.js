'use strict';

const express = require('express');
const expensesRouter = express.Router();

const expensesController = require('../controllers/expensesController');

expensesRouter.get('/', expensesController.getAll);
expensesRouter.post('/', expensesController.createExpense);
expensesRouter.get('/:expenseId', expensesController.getOneExpense);
expensesRouter.delete('/:expenseId', expensesController.removeExpense);
expensesRouter.patch('/:expenseId', expensesController.updateExpense);

module.exports = {
  expensesRouter,
};
