const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');

router.get('/', expensesController.getExpenses);

router.get('/:id', expensesController.getExpenseById);

router.post('/', expensesController.createExpense);

router.patch('/:id', expensesController.updateExpense);

router.delete('/:id', expensesController.deleteExpense);

module.exports = router;
