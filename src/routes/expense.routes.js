'use strict';

const express = require('express');
const expensesController = require('../controllers/expense.controller.js');

const expenseRouter = express.Router();

expenseRouter.get('/expenses', expensesController.getAll);
expenseRouter.get('/expenses/:id', expensesController.getById);
expenseRouter.post('/expenses', expensesController.create);
expenseRouter.delete('/expenses/:id', expensesController.remove);
expenseRouter.patch('/expenses/:id', expensesController.patch);

module.exports = { expenseRouter };
