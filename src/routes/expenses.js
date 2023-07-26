'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses');

const router = express.Router();

router.get('/:expenseId', expensesController.getExpenseById);
router.get('/', expensesController.getAllExpenses);
router.post('/', expensesController.addExpense);
router.patch('/:expenseId', expensesController.updateExpense);
router.delete('/:expenseId', expensesController.deleteExpense);

module.exports.expensesRouter = router;
