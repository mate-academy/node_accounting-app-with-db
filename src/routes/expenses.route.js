const expencesController = require('../controllers/expenses.controller');
const express = require('express');
const expensesRouter = express.Router();

expensesRouter.get('/', expencesController.getAllExpenses);

expensesRouter.get('/:id', expencesController.getExpenceById);

expensesRouter.post('/', expencesController.createNewExpense);

expensesRouter.delete('/:id', expencesController.removeExpence);

expensesRouter.patch('/:id', expencesController.updateExpenceById);

module.exports = expensesRouter;
