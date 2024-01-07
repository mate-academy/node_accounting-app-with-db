'use strict';

const express = require('express');

const { expenseController } = require('../controllers/expense.controller.js');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getAllFiltered);
expenseRouter.post('/', expenseController.create);
expenseRouter.get('/:id', expenseController.getOne);
expenseRouter.delete('/:id', expenseController.remove);
expenseRouter.patch('/:id', expenseController.update);

module.exports = {
  expenseRouter,
};
