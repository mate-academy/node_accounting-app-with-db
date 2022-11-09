'use strict';

const express = require('express');
const expensesController = require('./expenses-controller');

const router = express.Router();

// ======= EXPENSES API:
// GET ALL:
router.get('/', expensesController.getAllExpenses);

// GET ONE:
router.get('/:expenseId', expensesController.getOneExpense);

// POST ONE:
router.post('/', expensesController.createExpense);

// PATCH ONE:
router.patch('/:expenseId', expensesController.updateExpense);

// DELETE ONE:
router.delete('/:expenseId', expensesController.deleteExpense);

module.exports = router;
