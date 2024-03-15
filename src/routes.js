'use strict';

const express = require('express');
const router = express.Router();
const {
  createExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
} = require('./controllers/expenses');
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('./controllers/users');

router.post('users', createUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.patch('/users/:userId', updateUser);
router.delete('/users/:userId', deleteUser);

router.post('/expenses', createExpense);
router.get('/expenses', getExpenses);
router.get('/expenses/:id', getExpense);
router.patch('/expenses/:id', updateExpense);
router.delete('/expenses/:id', deleteExpense);

module.exports = router;
