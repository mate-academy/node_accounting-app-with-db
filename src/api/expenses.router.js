const express = require('express');
const expensesRouter = express.Router();

const expensesControllers = require('../controllers/expenses.controller');

expensesRouter.get('/', expensesControllers.getExpenses);

expensesRouter.get('/:id', expensesControllers.getExpense);

expensesRouter.post('/', expensesControllers.createNewExpense);

expensesRouter.patch('/:id', expensesControllers.updateExpense);

expensesRouter.put('/:id', expensesControllers.updateExpense);

expensesRouter.delete('/:id', expensesControllers.removeExpense);

module.exports = {
  expensesRouter,
};
