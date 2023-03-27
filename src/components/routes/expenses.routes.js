'use strict';

const express = require('express');
const expensesController = require('../expenses/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.post('/:id', expensesController.create);
expensesRouter.get('/', expensesController.getAll);
expensesRouter.get('/:id', expensesController.getById);
expensesRouter.delete('/:id', expensesController.removeById);
expensesRouter.patch('/:id', expensesController.updateById);

module.exports = expensesRouter;
