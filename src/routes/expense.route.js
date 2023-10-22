'use strict';

const express = require('express');

const expenseRouter = express.Router();

const expenseController = require('../controllers/expense.controller');

expenseRouter.patch('/:id', expenseController.update);

expenseRouter.get('/', expenseController.getAll);

expenseRouter.get('/:id', expenseController.getById);

expenseRouter.delete('/:id', expenseController.remove);

expenseRouter.post('/', expenseController.create);

module.exports = {
  expenseRouter,
};
