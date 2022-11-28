'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses');

const routerExpense = express.Router();

routerExpense.get('/', expenseController.getAll);

routerExpense.get('/:expenseId', expenseController.getOne);

routerExpense.post('/', expenseController.add);

routerExpense.delete('/:expenseId', expenseController.remove);

routerExpense.patch('/:expenseId', expenseController.update);

module.exports = { routerExpense };
