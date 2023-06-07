'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const router = express.Router();

router.get('/', expensesController.getAllExpenses);

router.get('/:expenseId', expensesController.getExpenseById);

router.post('/', expensesController.createExpense);

router.patch('/:expenseId', expensesController.updateExpense);

router.delete('/:expenseId', expensesController.deleteExpense);

module.exports = {
  router,
};
