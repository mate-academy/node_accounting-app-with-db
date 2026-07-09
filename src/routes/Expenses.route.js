const express = require('express');

const expensesController = require('../controllers/Expenses.controller.js');

const router = express.Router();

router.get('/', expensesController.getAllExpenses);
router.get('/:id', expensesController.getExpenseById);
router.post('/', expensesController.createExpense);
router.patch('/:id', expensesController.updateExpense);
router.delete('/:id', expensesController.removeExpense);

module.exports = router;
