'use strict';

const express = require('express');
const expenseController = require('../controllers/expenseController');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getAllExpenses);

expenseRouter.get('/:userId', expenseController.getExpenseByUserId);

expenseRouter.post('/', expenseController.create);

expenseRouter.delete('/:id', expenseController.remove);

expenseRouter.patch('/:id', expenseController.update);

module.exports = {
  expenseRouter,
};
