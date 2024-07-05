const express = require('express');

const {
  getFilteredExpense,
  setExpense,
  getCurrentExpense,
  deleteExpense,
  updateExpense,
} = require('./../controllers/expense.controller');

const {
  requestValidatorUserExpense,
  currentExpenseValidator,
  validateExpenseData,
} = require('../middleware/validator.middleware');

const router = express.Router();

router.get('/expenses', validateExpenseData, getFilteredExpense);

router.post('/expenses', requestValidatorUserExpense, setExpense);

router.get('/expenses/:id', currentExpenseValidator, getCurrentExpense);

router.delete('/expenses/:id', currentExpenseValidator, deleteExpense);

router.patch('/expenses/:id', currentExpenseValidator, updateExpense);

module.exports = {
  router,
};
