'use strict';

const express = require('express');

const {
  createExpense,
  getExpenses,
  deleteExpense,
} = require('../controllers/expense.controller');

const router = express.Router();

router.post('/', createExpense);
router.get('/', getExpenses);
router.delete('/', deleteExpense);

module.exports = {
  expenseRouter: router,
};
