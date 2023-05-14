'use strict';

const express = require('express');
const {
  getAllExpenses, getExpenseById, createExpense, removeExpense, updateExpense,
} = require('../controllers/expenses');

const router = express.Router();

router.get('/', getAllExpenses);
router.get('/:id', getExpenseById);
router.post('/', createExpense);
router.delete('/:id', removeExpense);
router.patch('/:id', updateExpense);

module.exports = { router };
