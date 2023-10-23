'use strict';

const express = require('express');
const expensesRouter = express.Router();
const expensesControllers = require('../controllers/expenses.controller');

expensesRouter.get('/', expensesControllers.getAll);

expensesRouter.post('/', expensesControllers.add);

expensesRouter.get('/:expenseId', expensesControllers.getCurrentExpense);

expensesRouter.delete('/:expenseId', expensesControllers.remove);

expensesRouter.patch('/:expenseId', expensesControllers.update);

module.exports = { expensesRouter };
