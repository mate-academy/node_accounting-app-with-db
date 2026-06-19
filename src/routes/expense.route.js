const express = require('express');
const expenseController = require('../controllers/expense.controller');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.getExpenses);

expenseRouter.post('/', expenseController.create);

expenseRouter.get('/:id', expenseController.getOne);

expenseRouter.delete('/:id', expenseController.deleteExpense);

expenseRouter.patch('/:id', expenseController.update);

module.exports = { expenseRouter };
