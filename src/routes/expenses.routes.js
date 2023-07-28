'use strict';

const express = require('express');
const expensesControllers = require('../controllers/expenses.controllers');

const router = express.Router();

router.get('/', express.json(), expensesControllers.getFilteredExpenses);
router.get('/:expenseId', expensesControllers.getOneExpense);
router.post('/', expensesControllers.createExpense);
router.delete('/:expenseId', expensesControllers.removeExpense);
router.patch('/:expenseId', expensesControllers.updateExpense);

module.exports = { router };
