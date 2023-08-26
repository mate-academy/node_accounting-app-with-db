'use strict';

const express = require('express');
const expensesController = require('../controllers/expensesController');
const { validateExpense } = require('../middleware/validateExpense');
const expensesService = require('../services/expenses');
const filterExpenses = require('../utils/filterExpenses');

const router = express.Router();

router.get('/', async(req, res, next) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  if (!userId && !from && !to && !categories) {
    next();
  }

  let responseBody = await expensesService.getAll();

  if (userId) {
    responseBody = filterExpenses.filterExpensesByUserId({
      expenses: responseBody,
      userId,
    });
  }

  if (from && to) {
    responseBody = filterExpenses.filterExpensesInDateRange({
      expenses: responseBody,
      from,
      to,
    });
  }

  if (categories) {
    responseBody = filterExpenses.filterExpensesByCategory({
      expenses: responseBody,
      categories,
    });
  }

  res.send(
    responseBody.map(expensesService.normalize),
  );
});

router.get('/', expensesController.getExpenses);
router.get('/:expenseId', expensesController.getExpense);
router.post('/', validateExpense, expensesController.createExpense);
router.patch('/:expenseId', expensesController.updateExpense);
router.delete('/:expenseId', expensesController.deleteExpense);

module.exports = {
  expensesRouter: router,
};
