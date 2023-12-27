'use strict';

const express = require('express');
const ExpenseRouter = express.Router();
const { ExpenseController } = require('./expense.controller');

ExpenseRouter.get('/', ExpenseController.getAll);
ExpenseRouter.get('/:id', ExpenseController.getById);
ExpenseRouter.post('/', ExpenseController.create);
ExpenseRouter.patch('/:id', ExpenseController.update);
ExpenseRouter.delete('/:id', ExpenseController.delete);

module.exports = { ExpenseRouter };
