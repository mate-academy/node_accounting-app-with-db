const expensesController = require('../controllers/expenses.controller');

const express = require('express');

const router = express.Router();

router.get('/', expensesController.getExpenses);
router.get('/:id', expensesController.getExpense);
router.post('/', expensesController.createExpense);
router.delete('/:id', expensesController.deleteExpense);
router.patch('/:id', expensesController.updateExpense);

module.exports = {
  router,
};
