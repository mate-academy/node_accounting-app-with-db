'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.controller');

const router = express.Router();

router.get('/', expensesController.getAllExpenses);
router.post('/', expensesController.createExpense);
router.get('/:id', expensesController.getExpenseById);
router.patch('/:id', expensesController.updateExpense);
router.delete('/:id', expensesController.deleteExpense);

module.exports = router;
