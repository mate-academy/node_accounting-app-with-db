'use strict';

const express = require('express');
const expensesControllers = require('../controllers/expenses');
const router = express.Router();

router.get('/', expensesControllers.getAll);

router.post('/', expensesControllers.addExpense);

router.get('/:expenseId', expensesControllers.getOneExpense);

router.delete('/:expenseId', expensesControllers.deleteExpense);

router.patch('/:expenseId', expensesControllers.updateExpense);

module.exports = { router };
