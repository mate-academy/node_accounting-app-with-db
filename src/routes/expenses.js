'use strict';

const express = require('express');

const expensesController = require('../controllers/expenses');

const router = express.Router();

router.get('/', expensesController.getAllExpenses);

router.get('/:expenseId', expensesController.getExpensesById);

router.post('/', express.json(), expensesController.addExpense);

router.delete('/:expenseId', expensesController.deleteExpense);

router.patch('/:expenseId', express.json(),
  expensesController.updateExpense);

module.exports = router;
