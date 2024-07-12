const express = require('express');
const expensesController = require('../controllers/expenses.controller.js');
const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAllExpenses);

expensesRouter.get('/:id', expensesController.getOneExpense);

expensesRouter.post('/', expensesController.createExpense);

expensesRouter.patch('/:id', expensesController.updateExpense);

expensesRouter.delete('/:id', expensesController.deleteExpense);

module.exports = { expensesRouter };
