'use strict';

const express = require('express');
const expensesControllers = require('../controllers/expenses');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesControllers.getAll);
expensesRouter.get('/:expenseId', expensesControllers.getOne);
expensesRouter.post('/', expensesControllers.addNewExpense);
expensesRouter.delete('/:expenseId', expensesControllers.deleteExpense);
expensesRouter.patch('/:expenseId', expensesControllers.updateExpense);

module.exports = expensesRouter;
