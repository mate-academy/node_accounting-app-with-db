'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {
  createExpensesController,
  getExpensesController,
  getExpensesByIdController,
  deleteExpensesController,
  updateExpensesController,
} = require('../controllers/Expenses.controller');

const expensesRouter = express.Router();

expensesRouter.use(bodyParser.json());

expensesRouter.post('/', createExpensesController);

expensesRouter.get('/', getExpensesController);

expensesRouter.get('/:id', getExpensesByIdController);

expensesRouter.delete('/:id', deleteExpensesController);

expensesRouter.patch('/:id', updateExpensesController);

module.exports = {
  expensesRouter,
};
