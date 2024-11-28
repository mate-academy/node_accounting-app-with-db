const express = require('express');

const expenseConroller = require('../controllers/expenses.controllers');

const expensesRouter = express.Router();

expensesRouter.get('/', expenseConroller.getAll);

expensesRouter.get('/:id', expenseConroller.getOne);

expensesRouter.post('/', expenseConroller.add);

expensesRouter.delete('/:id', expenseConroller.remove);

expensesRouter.patch('/:id', expenseConroller.update);

module.exports = {
  expensesRouter,
};
