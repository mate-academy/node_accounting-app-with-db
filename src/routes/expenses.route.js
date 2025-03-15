'use strict';

const express = require('express');
const expenseController = require('../controllers/expnese.controller');
const router = express.Router();

router.get('/', expenseController.getExpenses);

router.get('/:id', expenseController.getExpenseById);

router.post('/', expenseController.createExpense);

router.delete('/:id', expenseController.deleteExpense);

router.patch('/:id', expenseController.changeExpense);

module.exports = {
  router,
};
