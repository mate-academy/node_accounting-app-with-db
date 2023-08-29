'use strict';

const express = require('express');
const {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require('../controllers/expenses.js');

const router = express.Router();

router.get('/expenses', getExpenses);
router.post('/expenses', express.json(), createExpense);
router.get('/expenses/:id', getExpense);
router.delete('/expenses/:id', deleteExpense);
router.patch('/expenses/:id', express.json(), updateExpense);

module.exports = router;
