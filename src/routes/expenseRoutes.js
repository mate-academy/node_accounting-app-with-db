'use strict';

const express = require('express');
const usersController = require('../controllers/expensesController');
const router = express.Router();

router.get('/', usersController.getExpenses);
router.get('/:expenseId', usersController.getExpenseById);
router.post('/', usersController.createExpense);
router.delete('/:expenseId', usersController.removeExpense);
router.patch('/:expenseId', usersController.updateExpense);

module.exports = router;
