'use strict';

const express = require('express');
const expenseController = require('../controllers/expenses');

const router = express.Router();

router.get('/', expenseController.getAll);
router.get('/:expenseId', expenseController.getById);
router.post('/', expenseController.addExpense);
router.patch('/:expenseId', expenseController.updateExpense);
router.delete('/:expenseId', expenseController.deleteExpense);

module.exports = { router };
