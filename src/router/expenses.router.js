const express = require('express');
const route = express.Router();
const controllerExpense = require('./../controller/expenses.controller.js');

route.get('/', controllerExpense.getAllExpenses);
route.get('/:id', controllerExpense.getExpenseById);
route.post('/', controllerExpense.createExpense);
route.delete('/:id', controllerExpense.deleteExpense);
route.patch('/:id', controllerExpense.updateExpense);

module.exports = route;
