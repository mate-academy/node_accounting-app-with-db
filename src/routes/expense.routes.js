'use strict';

const express = require('express');

const expenseController = require('../controllers/expense.controller');

const router = express.Router();

router.get('/', expenseController.getFilteredExpenses);
router.get('/:expenseId', expenseController.getOneExpense);
router.post('/', expenseController.createExpense);
router.delete('/:expenseId', expenseController.removeExpense);
router.patch('/:expenseId', expenseController.updateExpense);

module.exports = { router };
