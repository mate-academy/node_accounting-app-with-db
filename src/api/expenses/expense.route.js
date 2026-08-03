const { Router } = require('express');
const expensesController = require('./expense.controller.js');

const expenses = Router();

expenses.get('/', expensesController.getAll);
expenses.get('/:id', expensesController.getOne);
expenses.post('/', expensesController.create);
expenses.delete('/:id', expensesController.deleteOne);
expenses.patch('/:id', expensesController.update);

module.exports = expenses;
