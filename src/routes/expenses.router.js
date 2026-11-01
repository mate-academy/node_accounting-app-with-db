'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/:id', expensesController.getOne);
expensesRouter.get('/', expensesController.getAll);
expensesRouter.post('/', expensesController.create);
expensesRouter.patch('/:id', expensesController.update);
expensesRouter.delete('/:id', expensesController.remove);

module.exports = {
  expensesRouter,
};
