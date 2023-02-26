'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');
const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);

expensesRouter.get('/:expenseId', expensesController.findById);

expensesRouter.post('/', express.json(), expensesController.create);

expensesRouter.delete('/:expenseId', expensesController.remove);

expensesRouter.patch(
  '/:expenseId',
  express.json(),
  expensesController.update
);

module.exports = expensesRouter;
