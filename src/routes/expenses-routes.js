const router = require('express').Router();
const express = require('express');
const {
  getExpenses,
  getExpenseById,
  postExpense,
  deleteExpense,
  updateExpense,
} = require('../controllers/expenses-controllers');

router.get('/expenses', express.json(), getExpenses);

router.post('/expenses', express.json(), postExpense);

router.get('/expenses/:id', getExpenseById);

router.delete('/expenses/:id', deleteExpense);

router.patch('/expenses/:id', express.json(), updateExpense);

module.exports = router;
