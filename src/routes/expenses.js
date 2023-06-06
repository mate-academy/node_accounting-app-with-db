'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses');

const expensesRouter = express.Router();

expensesRouter.patch('/:expenseId', expenseController.update);
expensesRouter.delete('/:expenseId', expenseController.remove);
expensesRouter.post('/', expenseController.add);
expensesRouter.get('/', expenseController.getAll);
expensesRouter.get('/:expenseId', expenseController.getOne);

module.exports = expensesRouter;
