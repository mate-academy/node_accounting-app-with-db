'use strict';

const express = require('express');

const {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenses');

const router = express.Router();

router.get('/', getExpenses);
router.get('/:expenseId', getExpenseById);
router.post('/', express.json(), createExpense);
router.patch('/:expenseId', express.json(), updateExpense);
router.delete('/:expenseId', deleteExpense);

module.exports = router;
