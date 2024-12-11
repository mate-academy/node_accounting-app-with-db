const express = require('express');

const expensesController = require('../controllers/expenses.controller');

const router = express.Router();

router.get('/', expensesController.getExpenses);
router.get('/:id', expensesController.getExpenseById);

router.post('/', expensesController.saveExpense);
router.delete('/:id', expensesController.removeExpense);
router.patch('/:id', expensesController.updateExpense);

module.exports = { expensesRouter: router };
