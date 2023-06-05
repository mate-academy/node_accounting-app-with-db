'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.js');

const router = express.Router();

router.get('/', expensesController.getExpenses);
router.get('/:expensesId', expensesController.getExpenseById);

router.post('/', expensesController.addExpense);
router.delete('/:expensesId', expensesController.removeExpense);
router.patch('/:expensesId', expensesController.updateExpense);

module.exports = {
  router,
};
