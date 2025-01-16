const express = require('express');
const expnseRouter = express.Router();
const expenseController = require('../controllers/expenses-Controllers');

expnseRouter.get('/', express.json(), expenseController.getAllExpenses);

expnseRouter.get('/:id', expenseController.getExpensById);

expnseRouter.post('/', express.json(), expenseController.createExpense);

expnseRouter.delete('/:id', expenseController.deleteExpense);

expnseRouter.patch('/:id', express.json(), expenseController.updateExpense);

module.exports = expnseRouter;
