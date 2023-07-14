'use strict';

const express = require('express');
const { expenseController } = require('../controllers/expenses');

const router = express.Router();

router.get('/', expenseController.getAllExpenses);

router.get('/:expenseId', expenseController.getOneExpense);

router.post('/', expenseController.addExpense);

router.delete('/:expenseId', expenseController.removeExpense);

router.patch('/:expenseId', expenseController.updateExpense);

module.exports = { router };
