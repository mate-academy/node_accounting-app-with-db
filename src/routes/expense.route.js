const express = require('express');
const ExpenseController = require('../controllers/expense.controller');

const expenseRouter = express.Router();

expenseRouter.get('/', ExpenseController.getAll);

expenseRouter.get('/:id', ExpenseController.get);

expenseRouter.post('/', ExpenseController.create);

expenseRouter.patch('/:id', ExpenseController.edit);

expenseRouter.delete('/:id', ExpenseController.remove);

module.exports = expenseRouter;
