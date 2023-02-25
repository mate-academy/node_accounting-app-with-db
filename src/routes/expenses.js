'use strict';

const expensesRouter = require('express').Router();
const { expenseControllers } = require('../controllers/expenses.js');

expensesRouter.get('/', expenseControllers.getAll);
expensesRouter.get('/:id', expenseControllers.getOne);
expensesRouter.post('/', expenseControllers.create);
expensesRouter.delete('/:id', expenseControllers.remove);
expensesRouter.patch('/:id', expenseControllers.update);

module.exports = {
  expensesRouter,
};
