/* eslint-disable no-undef */
const express = require('express');
const expensesController = require('../controllers/expenses.controler');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAllExpense);
expensesRouter.post('/', expensesController.createExpense);
expensesRouter.get('/:id', expensesController.getOneExpense);
expensesRouter.delete('/:id', expensesController.deleteExpense);
expensesRouter.patch('/:id', expensesController.updateExpense);

module.exports = {
  expensesRouter,
};
