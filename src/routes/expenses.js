'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getAll);

expensesRouter.get('/:expenseId', expensesController.getOne);

expensesRouter.post('/', expensesController.create);

expensesRouter.delete('/:expenseId', expensesController.remove);

expensesRouter.patch('/:expenseId', expensesController.update);

module.exports = expensesRouter;
