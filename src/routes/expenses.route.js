const express = require('express');

const expenseControllers = require('../controllers/expenses.controllers');

const router = express.Router();

router.get('/', expenseControllers.getAllExpenses);

router.get('/:id', expenseControllers.getOneExpense);

router.post('/', expenseControllers.createExpense);

router.delete('/:id', expenseControllers.deleteExpense);

router.patch('/:id', expenseControllers.updateExpense);

module.exports = {
  router,
};
