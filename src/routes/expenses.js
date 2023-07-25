'use strict';

const express = require('express');
const { expensesController } = require('../controllers/expenses');

const router = express.Router();

router.get('/', expensesController.getExpenses);
router.post('/', expensesController.addExpense);
router.get('/:expenseId', expensesController.getExpenseById);
router.delete('/:expenseId', expensesController.deleteExpense);
router.patch('/:expenseId', expensesController.updateExpense);

module.exports.expensesRouter = router;
