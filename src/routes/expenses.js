'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses');

const expensesRouter = express.Router();

expensesRouter.get('/', expenseController.getAll);
expensesRouter.get('/:expenseId', expenseController.getOne);
expensesRouter.post('/', expenseController.add);
expensesRouter.delete('/:expenseId', expenseController.remove);
expensesRouter.patch('/:expenseId', expenseController.update);

module.exports = { expensesRouter };
