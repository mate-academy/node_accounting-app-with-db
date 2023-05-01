'use strict';

const expenseController = require('../controllers/expenses.js');
const express = require('express');

const router = express.Router();

router.get('/', expenseController.getAll);

router.get('/:expenseId', expenseController.getOne);

router.post('/', expenseController.addExpense);

router.delete('/:expenseId', expenseController.removeExpense);

router.patch('/:expenseId', expenseController.updateExpense);

module.exports = { router };
