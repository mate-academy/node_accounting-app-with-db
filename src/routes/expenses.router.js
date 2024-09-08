'use strict';

const express = require('express');

const expensesController = require('../controllers/expenses.controller');
const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAllExpenses);
expensesRouter.post('/', expensesController.createExpense);
expensesRouter.get('/:id', expensesController.getOneExpense);
expensesRouter.patch('/:id', expensesController.updateExpense);
expensesRouter.delete('/:id', expensesController.removeExpense);

module.exports = expensesRouter;
