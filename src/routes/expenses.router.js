'use strict';

const express = require('express');
const controller = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', express.json(), controller.getAllExpenses);

expensesRouter.get('/:id', express.json(), controller.getExpense);

expensesRouter.post('/', express.json(), controller.post);

expensesRouter.delete('/:id', express.json(), controller.removeExpense);

expensesRouter.patch('/:id', express.json(), controller.updateExpense);

module.exports = expensesRouter;
